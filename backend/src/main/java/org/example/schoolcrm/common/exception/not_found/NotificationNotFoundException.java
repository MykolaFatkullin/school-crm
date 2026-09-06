package org.example.schoolcrm.common.exception.not_found;

import java.util.UUID;

public class NotificationNotFoundException extends NotFoundException {
  public NotificationNotFoundException(UUID notificationId) {
    super("Notification not found by id: " + notificationId);
  }
}
