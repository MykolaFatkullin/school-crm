package org.example.schoolcrm.web.dto.auth;

import jakarta.validation.constraints.NotBlank;

public record ResetPasswordRequest(
    @NotBlank
    String email
) {
}
