package com.skillsphere.controller;

import com.skillsphere.dto.AuthRequest;
import com.skillsphere.model.AppUser;
import com.skillsphere.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService auth;
    public AuthController(AuthService auth) { this.auth = auth; }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> register(@Valid @RequestBody AuthRequest request) {
        return safeUser(auth.register(request));
    }

    @PostMapping("/login")
    public Map<String, Object> login(@Valid @RequestBody AuthRequest request) {
        return safeUser(auth.login(request));
    }

    private Map<String, Object> safeUser(AppUser user) {
        return Map.of("id", user.getId(), "name", user.getName(), "email", user.getEmail());
    }
}
