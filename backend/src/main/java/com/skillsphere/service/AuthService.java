package com.skillsphere.service;

import com.skillsphere.dto.AuthRequest;
import com.skillsphere.model.AppUser;
import com.skillsphere.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository users;
    public AuthService(UserRepository users) { this.users = users; }

    public AppUser register(AuthRequest request) {
        if (request.getName() == null || request.getName().isBlank()
                || request.getEmail() == null || request.getEmail().isBlank()
                || request.getPassword() == null || request.getPassword().length() < 4) {
            throw new IllegalArgumentException("Enter name, email and a password of at least 4 characters.");
        }
        String email = request.getEmail().trim().toLowerCase();
        if (users.existsByEmail(email)) throw new IllegalArgumentException("Email is already registered.");
        // Academic demo only: replace with BCrypt + Spring Security in production.
        return users.save(new AppUser(request.getName().trim(), email, request.getPassword()));
    }

    public AppUser login(AuthRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase();
        AppUser user = users.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        if (!user.getPassword().equals(request.getPassword()))
            throw new IllegalArgumentException("Invalid email or password.");
        return user;
    }
}
