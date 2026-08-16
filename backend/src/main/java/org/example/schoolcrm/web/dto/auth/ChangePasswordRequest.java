package org.example.schoolcrm.web.dto.auth;

import java.util.UUID;

public record ChangePasswordRequest(
    UUID token,
    String password
) {
}
