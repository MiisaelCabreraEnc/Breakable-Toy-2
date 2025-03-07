package encora.spark.breakable_toy.backend.services.impl;

import encora.spark.breakable_toy.backend.services.JwtService;
import encora.spark.breakable_toy.backend.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.client.RestTemplate;


class AuthServiceImplTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthServiceImpl authService;

    private final String validCode = "valid_code";
    private final String spotifyToken = "spotify_token";
    private final String userEmail = "user@example.com";
    private final String jwtToken = "jwt_token";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


}
