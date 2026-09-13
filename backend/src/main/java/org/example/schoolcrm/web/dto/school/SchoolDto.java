package org.example.schoolcrm.web.dto.school;

import jakarta.validation.constraints.NotBlank;

public record SchoolDto(@NotBlank String name, @NotBlank String timezone) {}
