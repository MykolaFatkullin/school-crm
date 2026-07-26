package org.example.schoolcrm.web.dto.auth;

import java.util.UUID;

public record RefreshRequest(UUID refreshToken) {}
