package org.example.schoolcrm.web.dto.notifications;

import java.time.Instant;
import java.util.UUID;
import org.example.schoolcrm.domain.NotificationType;

public record NotificationsDto(
    UUID id, String message, NotificationType type, boolean read, Instant createdAt) {}
