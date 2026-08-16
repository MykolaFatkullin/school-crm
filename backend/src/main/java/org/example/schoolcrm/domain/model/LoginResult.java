package org.example.schoolcrm.domain.model;

public record LoginResult(
    String accessToken,
    String refreshToken
) {
}
