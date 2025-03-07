package encora.spark.breakable_toy.backend.controllers;

import encora.spark.breakable_toy.backend.services.JwtService;
import encora.spark.breakable_toy.backend.services.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.ArrayList;

import static org.mockito.Mockito.*;

class JwtAuthenticationFilterTest {

    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private JwtService jwtService;
    private UserService userService;
    private HttpServletRequest request;
    private HttpServletResponse response;
    private FilterChain filterChain;

    @BeforeEach
    void setUp() {

        //Given
        jwtService = mock(JwtService.class);
        userService = mock(UserService.class);
        jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtService, userService);

        request = mock(HttpServletRequest.class);
        response = mock(HttpServletResponse.class);
        filterChain = mock(FilterChain.class);

        SecurityContextHolder.clearContext(); // Limpia el contexto antes de cada prueba
    }

    @Test
    void testDoFilterInternalShouldContinueFilterChainWhenNoAuthHeader() throws ServletException, IOException {

        //When
        when(request.getHeader("Authorization")).thenReturn(null);
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        //Then
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService, userService);
    }

    @Test
    void doFilterInternalShouldContinueFilterChainWhenAuthHeaderIsInvalid() throws ServletException, IOException {

        //When
        when(request.getHeader("Authorization")).thenReturn("InvalidToken");
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        //Then
        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService, userService);
    }

    @Test
    void doFilterInternalShouldNotSetAuthenticationWhenTokenIsInvalid() throws ServletException, IOException {

        //Given
        String jwtToken = "invalid.jwt.token";
        String username = "testUser";
        UserDetails userDetails = new User(username, "password", new ArrayList<>());

        //When
        when(request.getHeader("Authorization")).thenReturn("Bearer " + jwtToken);
        when(jwtService.extractUsername(jwtToken)).thenReturn(username);
        when(userService.loadUserByUsername(username)).thenReturn(userDetails);
        when(jwtService.validateToken(jwtToken, userDetails)).thenReturn(false);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        //Then
        assert SecurityContextHolder.getContext().getAuthentication() == null;
        verify(filterChain).doFilter(request, response);
    }
}
