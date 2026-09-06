package org.example.schoolcrm.web;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.application.service.notifications.NotificationsService;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.notifications.NotificationsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

  private final NotificationsService notificationsService;

  @PatchMapping("/{id}/read")
  public ResponseEntity<Void> readNotification(
      @PathVariable(name = "id") UUID id, @AuthenticationPrincipal UserPrincipal principal) {
    notificationsService.readNotification(id, principal.userId());

    return ResponseEntity.noContent().build();
  }

  @PatchMapping("/read-all")
  public ResponseEntity<Void> readAllNotifications(
      @AuthenticationPrincipal UserPrincipal principal) {
    notificationsService.readAllNotifications(principal.userId());

    return ResponseEntity.noContent().build();
  }

  @DeleteMapping("/delete")
  public ResponseEntity<Void> deleteNotifications(
      @AuthenticationPrincipal UserPrincipal principal) {
    notificationsService.deleteNotifications(principal.userId());

    return ResponseEntity.noContent().build();
  }

  @GetMapping("/all")
  public ResponseEntity<Page<NotificationsDto>> getNotificationsByUser(
      @AuthenticationPrincipal UserPrincipal principal,
      @PageableDefault(size = 20) Pageable pageable) {
    val notifications = notificationsService.getNotificationsByUser(principal.userId(), pageable);

    return ResponseEntity.ok(notifications);
  }
}
