package org.example.schoolcrm.web.dto.school;

public record SchoolSmtpSettingsDto(
    String smtpHost,
    Integer smtpPort,
    String smtpUsername,
    String smtpPassword,
    String encryption,
    String fromEmail,
    String fromName) {}
