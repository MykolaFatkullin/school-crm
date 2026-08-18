package org.example.schoolcrm.web.dto.mail;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import org.example.schoolcrm.domain.MailType;

public record MailTokenRequest(@NotNull UUID token, @NotNull MailType type) {}
