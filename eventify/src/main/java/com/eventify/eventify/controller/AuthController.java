package com.eventify.eventify.controller;

import com.eventify.eventify.dto.LoginRequest;
import com.eventify.eventify.dto.LoginResponse;
import com.eventify.eventify.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        String token = authService.authenticate(request);

        return new LoginResponse(token);
    }
}

