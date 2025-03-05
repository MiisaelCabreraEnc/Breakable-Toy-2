package encora.spark.breakable_toy.backend.controllers;

import encora.spark.breakable_toy.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @Value("${spring.security.auth.url}")
    private String authUrl;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/spotify")
    public ResponseEntity<Map<String, String>> login() {
        return ResponseEntity.ok(Map.of("auth_url", authUrl));
    }

    @GetMapping("/callback")
    public ResponseEntity<?> callback(@RequestParam String code) {
        String jwt = authService.handleCallback(code);
        return ResponseEntity.ok(Collections.singletonMap("access_token", jwt));
    }
}
