package org.example.schoolcrm.web;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.application.service.notifications.NotificationsService;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.notifications.NotificationsDto;
import org.example.schoolcrm.web.dto.notifications.NotificationsMetaDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

  private final NotificationsService notificationsService;

  @PatchMapping("/read")
  public ResponseEntity<NotificationsDto> readNotification(
      @RequestParam(name = "id") UUID id, @AuthenticationPrincipal UserPrincipal principal) {
    val updatedNotification = notificationsService.readNotification(id, principal.userId());

    return ResponseEntity.ok(updatedNotification);
  }

  @PatchMapping("/read-all")
  public void readAllNotifications(@AuthenticationPrincipal UserPrincipal principal) {
    notificationsService.readAllNotifications(principal.userId());
  }

  @DeleteMapping("/delete")
  public void deleteNotifications(@AuthenticationPrincipal UserPrincipal principal) {
    notificationsService.deleteNotifications(principal.userId());
  }

  @GetMapping("/all")
  public ResponseEntity<Page<NotificationsDto>> getNotificationsByUser(
      @AuthenticationPrincipal UserPrincipal principal,
      @PageableDefault(size = 20) Pageable pageable) {
    val notifications = notificationsService.getNotificationsByUser(principal.userId(), pageable);

    return ResponseEntity.ok(notifications);
  }

  @GetMapping("/meta")
  public ResponseEntity<NotificationsMetaDto> getUnreadNotificationsCount(
      @AuthenticationPrincipal UserPrincipal principal) {
    val unreadNotificationsCount =
        notificationsService.getUnreadNotificationsCount(principal.userId());
    return ResponseEntity.ok(unreadNotificationsCount);
  }
}
