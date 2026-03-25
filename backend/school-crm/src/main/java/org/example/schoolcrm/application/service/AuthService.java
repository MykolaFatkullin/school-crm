package org.example.schoolcrm.application.service;

import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.domain.UserRoles;
import org.example.schoolcrm.infrastructure.security.CustomUserDetails;
import org.example.schoolcrm.infrastructure.security.JwtProvider;
import org.example.schoolcrm.web.dto.auth.LoginRequest;
import org.example.schoolcrm.web.dto.auth.RefreshRequest;
import org.example.schoolcrm.web.dto.auth.TokenResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final RefreshTokenService refreshTokenService;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public TokenResponse login(LoginRequest loginRequest) {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.email(),
                        loginRequest.password()
                )
        );

        var user = (CustomUserDetails) auth.getPrincipal();

        var jwt = jwtProvider.generateAccessToken(user.getId(), user.getRole().name());

        var expiresAt = Instant.now().plus(7, ChronoUnit.DAYS);

        var refresh = refreshTokenService.create(user.getId(), expiresAt);

        return new TokenResponse(jwt, refresh.getToken());
    }

    public TokenResponse refresh(RefreshRequest refreshRequest) {
        var existing = refreshTokenService.validate(refreshRequest.refreshToken());

        refreshTokenService.delete(existing.getToken());

        var user = userService.findById(existing.getUserId());

        var access = jwtProvider.generateAccessToken(user.getId(), user.getRole().name());

        var newToken = refreshTokenService.create(user.getId(), existing.getExpiresAt());

        return new TokenResponse(access, newToken.getToken());
    }

    public void logout(RefreshRequest refreshRequest) {
        refreshTokenService.delete(refreshRequest.refreshToken());
    }
}
