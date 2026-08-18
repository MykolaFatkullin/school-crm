package org.example.schoolcrm.web.dto.auth;

import org.example.schoolcrm.domain.MailVerificationResult;

public record UserVerificationResponse(MailVerificationResult result) {}
