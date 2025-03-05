package encora.spark.breakable_toy.backend.services;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService implements UserDetailsService {

    private final Map<String, String> spotifyTokenByEmail = new HashMap<>();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User(username, "", Collections.emptyList());
    }

    public void setSpotifyTokenByEmail(String email, String spotifyToken){
        spotifyTokenByEmail.put(email, spotifyToken);
    }

    public String getSpotifyTokenByEmail(String email){
        return spotifyTokenByEmail.get(email);
    }


}
