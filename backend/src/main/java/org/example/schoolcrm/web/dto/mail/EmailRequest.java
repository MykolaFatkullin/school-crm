package org.example.schoolcrm.web.dto.mail;

import jakarta.validation.constraints.NotBlank;
import org.example.schoolcrm.domain.MailType;

public record EmailRequest(
    @NotBlank
    String email,
    MailType type
) {
}
