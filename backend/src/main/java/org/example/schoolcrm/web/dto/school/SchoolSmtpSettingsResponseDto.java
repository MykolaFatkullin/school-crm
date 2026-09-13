package org.example.schoolcrm.web.dto.school;

public record SchoolSmtpSettingsResponseDto(
    String smtpHost,
    Integer smtpPort,
    String smtpUsername,
    boolean smtpPasswordConfigured,
    String encryption,
    String fromEmail,
    String fromName) {}
