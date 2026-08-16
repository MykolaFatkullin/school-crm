package org.example.schoolcrm.web.dto.mail;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.example.schoolcrm.domain.MailType;

import java.util.UUID;

public record MailTokenRequest(
    @NotBlank
    UUID token,

    @NotNull
    MailType type
) {
}
