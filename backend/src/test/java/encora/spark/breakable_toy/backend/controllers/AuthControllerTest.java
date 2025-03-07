package encora.spark.breakable_toy.backend.controllers;

import encora.spark.breakable_toy.backend.services.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AuthService authService;

    private final String authUrl = "http://url/for/testing";

    @BeforeEach
    void setUp() {

        //Given
        authService = mock(AuthService.class);
        AuthController authController = new AuthController(authService);

        try {
            java.lang.reflect.Field authUrlField = AuthController.class.getDeclaredField("authUrl");
            authUrlField.setAccessible(true);
            authUrlField.set(authController, authUrl);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    void login_ShouldReturnAuthUrl() throws Exception {

        //Then
        mockMvc.perform(post("/auth/spotify")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.auth_url", is(authUrl)));
    }

    @Test
    void callback_ShouldReturnAccessToken() throws Exception {

        //Given
        String code = "test_code";
        String fakeJwt = "fake_jwt_token";

        //When
        when(authService.handleCallback(code)).thenReturn(fakeJwt);

        //Then
        mockMvc.perform(get("/auth/callback")
                        .param("code", code)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.access_token", is(fakeJwt)));
    }
}
