package org.example.schoolcrm.application.service.notifications;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.NotificationsMapper;
import org.example.schoolcrm.common.exception.not_found.NotificationNotFoundException;
import org.example.schoolcrm.domain.NotificationType;
import org.example.schoolcrm.infrastructure.persistence.entity.NotificationsEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.NotificationsRepository;
import org.example.schoolcrm.web.dto.notifications.NotificationsDto;
import org.example.schoolcrm.web.dto.notifications.NotificationsMetaDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationsService {

  private final NotificationsRepository notificationsRepository;
  private final NotificationsPublisher notificationsPublisher;
  private final NotificationsMapper notificationsMapper;

  public void createNotification(
      NotificationType notificationType, String message, UserEntity user) {
    val notification =
        NotificationsEntity.builder().message(message).user(user).type(notificationType).build();

    val storedNotification = notificationsRepository.save(notification);
    val dto = notificationsMapper.toDto(storedNotification);

    notificationsPublisher.publishNotification(user.getId(), dto);
  }

  @Transactional
  public NotificationsDto readNotification(UUID notificationId, UUID userId) {
    val storedNotification =
        notificationsRepository
            .findByIdAndUserIdAndRead(notificationId, userId, false)
            .orElseThrow(() -> new NotificationNotFoundException(notificationId));

    storedNotification.setRead(true);

    val saved = notificationsRepository.save(storedNotification);

    return notificationsMapper.toDto(saved);
  }

  @Transactional
  public void readAllNotifications(UUID userId) {
    notificationsRepository.readAllNotificationsByUser(userId);
  }

  @Transactional
  public void deleteNotifications(UUID userId) {
    notificationsRepository.deleteAllByUserId(userId);
  }

  public Page<NotificationsDto> getNotificationsByUser(UUID userId, Pageable pageable) {
    return notificationsRepository.findByUserId(userId, pageable).map(notificationsMapper::toDto);
  }

  public NotificationsMetaDto getUnreadNotificationsCount(UUID userId) {
    val count = notificationsRepository.getCountOfUnreadNotificationsByUser(userId);

    return new NotificationsMetaDto(count);
  }
}
