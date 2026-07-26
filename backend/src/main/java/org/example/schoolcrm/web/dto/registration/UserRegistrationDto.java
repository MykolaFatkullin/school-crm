package org.example.schoolcrm.web.dto.registration;

import java.time.LocalDate;
import org.example.schoolcrm.domain.Gender;

public record UserRegistrationDto(
    String firstName,
    String lastName,
    String email,
    String password,
    Gender gender,
    LocalDate birthDate) {}
