package encora.spark.breakable_toy.backend.config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if(authentication instanceof  UsernamePasswordAuthenticationToken){
            return new CustomAuthenticationToken((String)authentication.getPrincipal(), (String)authentication.getCredentials());
        }
        return authentication ;
    }

    @Override
    public boolean supports(Class<?> authentication) {

        return authentication == CustomAuthenticationToken.class || authentication == UsernamePasswordAuthenticationToken.class;
    }
}
