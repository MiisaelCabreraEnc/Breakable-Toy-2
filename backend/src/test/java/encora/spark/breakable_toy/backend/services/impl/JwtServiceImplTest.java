package encora.spark.breakable_toy.backend.services.impl;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceImplTest {

    private JwtServiceImpl jwtService;
    private UserDetails userDetails;

    private String secretKey = "thisIsATestSecretKeyInOrderToCreateUnitTests" ;


    @BeforeEach
    void setUp() {

        //Given
        jwtService = new JwtServiceImpl();
        String encodedSecretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        jwtService.setSECRET_KEY(encodedSecretKey);

        userDetails = new User("testUser", "password", new ArrayList<>());
    }

    @Test
    void testGenerateTokenShouldGenerateValidToken() {

        //When
        String token = jwtService.generateToken(userDetails);

        //Then
        assertNotNull(token);
        assertTrue(token.startsWith("eyJ"));
    }

    @Test
    void testValidateTokenShouldReturnTrueForValidToken() {

        //Given
        String token = jwtService.generateToken(userDetails);

        //When
        boolean isValid = jwtService.validateToken(token, userDetails);

        //Then
        assertTrue(isValid);
    }


    @Test
    void testExtractUsernameShouldReturnCorrectUsername() {
        //Given
        String token = jwtService.generateToken(userDetails);

        //When
        String username = jwtService.extractUsername(token);

        //Then
        assertEquals("testUser", username);
    }


    @Test
    void testIsTokenExpiredShouldReturnFalseIfTokenNotExpired() {
        //Given
        String token = jwtService.generateToken(userDetails);

        //When
        boolean isExpired = jwtService.isTokenExpired(token);

        //Then
        assertFalse(isExpired);
    }

    @Test
    void testExtractExpirationShouldReturnExpirationDate() {
        //Given
        String token = jwtService.generateToken(userDetails);

        //When
        Date expiration = jwtService.extractExpiration(token);

        //Then
        assertNotNull(expiration);
    }
}
