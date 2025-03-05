package encora.spark.breakable_toy.backend.services;

import encora.spark.breakable_toy.backend.services.impl.AuthServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.client.RestTemplate;

import static org.mockito.Mockito.*;

public class AuthServiceImplTest {

    @Test
    public void testCallBack(){
        //Given
        String mockCode = "mock_auth_code";
        String mockSpotifyToken = "mock_spotify_token";
        String mockUsername = "user@example.com";
        String mockJwt = "mock_jwt_token";

        AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
        JwtService jwtService = mock(JwtService.class);
        UserService userService = mock(UserService.class);
        RestTemplate restTemplate = mock(RestTemplate.class);

        AuthServiceImpl authService = new AuthServiceImpl(authenticationManager, jwtService, userService, restTemplate);

    }
}
