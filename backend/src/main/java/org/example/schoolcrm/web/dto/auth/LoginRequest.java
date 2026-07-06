package org.example.schoolcrm.web.dto.auth;

public record LoginRequest(
        String email,
        String password
) {
}
