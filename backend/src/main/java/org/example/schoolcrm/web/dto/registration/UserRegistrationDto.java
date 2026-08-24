package org.example.schoolcrm.web.dto.registration;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.example.schoolcrm.domain.Gender;
import org.hibernate.validator.constraints.Length;

public record UserRegistrationDto(
    @NotBlank String schoolName,
    @NotBlank String firstName,
    @NotBlank String lastName,
    @NotBlank @Email String email,
    @NotBlank @Length(min = 8, max = 32, message = "Password length should be between 8 and 32")
        String password,
    @NotNull Gender gender) {}
