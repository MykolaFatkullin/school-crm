package org.example.schoolcrm.web.dto.school;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record SchoolPaymentSettingsDto(
    @NotBlank @Size(max = 255) String apiKey,
    @NotBlank @Size(max = 255) String secretKey,
    @NotBlank @Size(min = 3, max = 3) String currency,
    @NotNull
        @DecimalMin(value = "0.00")
        @DecimalMax(value = "100.00")
        @Digits(integer = 3, fraction = 2)
        BigDecimal taxRatePercentage,
    @NotBlank @Size(max = 50) String invoicePrefix,
    @NotNull @PositiveOrZero Integer defaultPaymentDueDays) {}
