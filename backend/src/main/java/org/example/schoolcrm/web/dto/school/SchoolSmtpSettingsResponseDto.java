package org.example.schoolcrm.web.dto.school;

import org.example.schoolcrm.domain.SMTPEncryption;

public record SchoolSmtpSettingsResponseDto(
    String smtpHost,
    Integer smtpPort,
    String smtpUsername,
    boolean smtpPasswordConfigured,
    SMTPEncryption encryption,
    String fromEmail,
    String fromName) {}
