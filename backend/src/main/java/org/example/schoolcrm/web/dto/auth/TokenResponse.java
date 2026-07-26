package org.example.schoolcrm.web.dto.auth;

import java.util.UUID;

public record TokenResponse(String accessToken, UUID refreshToken) {}
