package org.example.schoolcrm.web.dto.school;

import java.math.BigDecimal;

public record SchoolPaymentSettingsResponseDto(
    boolean apiKeyConfigured,
    boolean secretKeyConfigured,
    String currency,
    BigDecimal taxRatePercentage,
    String invoicePrefix,
    Integer defaultPaymentDueDays) {}
