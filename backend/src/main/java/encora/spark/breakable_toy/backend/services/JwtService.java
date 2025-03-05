package encora.spark.breakable_toy.backend.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public interface JwtService {
    String generateToken(UserDetails userDetails);

    boolean validateToken(String token, UserDetails userDetails) ;

    String extractUsername(String token);

    boolean isTokenExpired(String token);

    Date extractExpiration(String token);
}
