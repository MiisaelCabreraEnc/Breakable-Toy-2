package encora.spark.breakable_toy.backend.services.impl;

import encora.spark.breakable_toy.backend.config.CustomAuthenticationToken;
import encora.spark.breakable_toy.backend.services.AuthService;
import encora.spark.breakable_toy.backend.services.JwtService;
import encora.spark.breakable_toy.backend.services.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    private final RestTemplate restTemplate;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final UserService userService;

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;

    @Value("${spotify.redirect-uri}")
    private String redirectUri;

    @Value("${spotify.token-url}")
    private String SPOTIFY_TOKEN_URL;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService, RestTemplate restTemplate) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.restTemplate = restTemplate;
    }

    @Override
    public String handleCallback(String code){

        if (code == null || code.isEmpty()) {
            throw new IllegalArgumentException("Authorization code cannot be null or empty");
        }

        MultiValueMap<String,String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("code", code);
        body.add("redirect_uri", redirectUri);
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(SPOTIFY_TOKEN_URL, HttpMethod.POST, request, Map.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Failed to get access token from Spotify");
        }

        String spotifyToken = (String)response.getBody().get("access_token");

        if (spotifyToken == null) {
            throw new RuntimeException("Spotify token is null");
        }

        HttpHeaders spotifyHeaders = new HttpHeaders();
        spotifyHeaders.setBearerAuth(spotifyToken);


        HttpEntity<String> entity = new HttpEntity<>(spotifyHeaders);
        ResponseEntity<Map> userDataResponse = restTemplate.exchange(
                "https://api.spotify.com/v1/me",
                HttpMethod.GET,
                entity,
                Map.class
        );

        if (!userDataResponse.getStatusCode().is2xxSuccessful() || userDataResponse.getBody() == null) {
            throw new RuntimeException("Failed to get user data from Spotify");
        }

        String username = (String)userDataResponse.getBody().get("email");

        authenticationManager.authenticate(new CustomAuthenticationToken(username, spotifyToken));
        UserDetails userDetails = userService.loadUserByUsername(username);
        String jwt = jwtService.generateToken(userDetails);

        userService.setSpotifyTokenByEmail(username, spotifyToken);

        return (jwt);
    }
}
