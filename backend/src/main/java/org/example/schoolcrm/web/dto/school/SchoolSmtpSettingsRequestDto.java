package org.example.schoolcrm.web.dto.school;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.example.schoolcrm.domain.SMTPEncryption;

public record SchoolSmtpSettingsRequestDto(
    @NotBlank @Size(max = 255) String smtpHost,
    @NotNull @Min(1) @Max(65535) Integer smtpPort,
    @NotBlank @Size(max = 255) String smtpUsername,
    @Size(max = 255) String smtpPassword,
    @NotNull SMTPEncryption encryption,
    @NotBlank @Size(max = 255) String fromEmail,
    @NotBlank @Size(max = 255) String fromName) {}
