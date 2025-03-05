package encora.spark.breakable_toy.backend.config;

import org.springframework.security.authentication.AbstractAuthenticationToken;

import java.util.Collections;

public final class CustomAuthenticationToken extends AbstractAuthenticationToken {

    private final String username;
    private final String spotifyToken;

    public CustomAuthenticationToken(String username, String spotifyToken) {
        super(Collections.emptyList());
        this.username = username;
        this.spotifyToken = spotifyToken;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return username;
    }

    public String getSpotifyToken() {
        return spotifyToken;
    }
}
