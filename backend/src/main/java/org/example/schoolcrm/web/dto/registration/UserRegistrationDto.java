package org.example.schoolcrm.web.dto.registration;

import org.example.schoolcrm.domain.Gender;

import java.time.LocalDate;

public record UserRegistrationDto(
        String firstName,
        String lastName,
        String email,
        String password,
        Gender gender,
        LocalDate birthDate
) {
}
