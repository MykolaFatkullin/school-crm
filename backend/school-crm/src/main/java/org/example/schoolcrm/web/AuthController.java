package org.example.schoolcrm.web;

import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.application.service.AuthService;
import org.example.schoolcrm.web.dto.auth.LoginRequest;
import org.example.schoolcrm.web.dto.auth.RefreshRequest;
import org.example.schoolcrm.web.dto.auth.TokenResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/refresh")
    public TokenResponse refreshToken(@RequestBody RefreshRequest refreshRequest) {
        return authService.refresh(refreshRequest);
    }

    @PostMapping("/logout")
    public void logout(@RequestBody RefreshRequest refreshRequest) {
        authService.logout(refreshRequest);
    }
}
