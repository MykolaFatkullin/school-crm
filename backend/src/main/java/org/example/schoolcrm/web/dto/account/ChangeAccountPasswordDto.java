package org.example.schoolcrm.web.dto.account;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record ChangeAccountPasswordDto(
    @NotBlank @Length(min = 8, max = 32, message = "Password length should be between 8 and 32")
        String oldPassword,
    @NotBlank @Length(min = 8, max = 32, message = "Password length should be between 8 and 32")
        String newPassword) {}
