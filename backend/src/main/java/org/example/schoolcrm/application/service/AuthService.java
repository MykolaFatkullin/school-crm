package org.example.schoolcrm.application.service;

import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.common.exception.auth.AuthException;
import org.example.schoolcrm.domain.Gender;
import org.example.schoolcrm.domain.UserRoles;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.SchoolRepository;
import org.example.schoolcrm.infrastructure.security.JwtProvider;
import org.example.schoolcrm.web.dto.auth.LoginRequest;
import org.example.schoolcrm.web.dto.auth.RefreshRequest;
import org.example.schoolcrm.web.dto.auth.TokenResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final RefreshTokenService refreshTokenService;
    private final JwtProvider jwtProvider;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public TokenResponse login(LoginRequest loginRequest) {
        var user = userService.findByEmail(loginRequest.email());

        if (user == null) {
            throw new AuthException("Unauthorized");
        }

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new AuthException("Invalid password");
        }

        var jwt = jwtProvider.generateAccessToken(user.getId(), user.getRole().name(), getSchoolId(user));

        var expiresAt = Instant.now().plus(7, ChronoUnit.DAYS);

        var refresh = refreshTokenService.create(user.getId(), expiresAt);

        return new TokenResponse(jwt, refresh.getToken());
    }

    public TokenResponse refresh(RefreshRequest refreshRequest) {
        var existing = refreshTokenService.validate(refreshRequest.refreshToken());

        refreshTokenService.delete(existing.getToken());

        var user = userService.findById(existing.getUserId());

        var access = jwtProvider.generateAccessToken(user.getId(), user.getRole().name(), getSchoolId(user));

        var newToken = refreshTokenService.create(user.getId(), existing.getExpiresAt());

        return new TokenResponse(access, newToken.getToken());
    }

    public void logout(RefreshRequest refreshRequest) {
        refreshTokenService.delete(refreshRequest.refreshToken());
    }

    private UUID getSchoolId(UserEntity user) {
        return user.getSchool() != null ? user.getSchool().getId() : null;
    }
}
