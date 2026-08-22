package org.example.schoolcrm.web.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record ChangePasswordRequest(@NotNull UUID token, @NotBlank @Size(min = 8) String password) {}
