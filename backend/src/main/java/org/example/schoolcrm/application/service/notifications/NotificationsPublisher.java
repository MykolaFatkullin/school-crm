package org.example.schoolcrm.application.service.notifications;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.web.dto.notifications.NotificationsDto;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationsPublisher {

  private final SimpMessagingTemplate template;

  public void publishNotification(UUID userId, NotificationsDto notificationsDto) {
    template.convertAndSendToUser(userId.toString(), "/queue/notifications", notificationsDto);
  }
}
