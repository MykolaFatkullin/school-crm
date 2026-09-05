package org.example.schoolcrm.infrastructure.persistence.repository;

import java.util.Optional;
import java.util.UUID;
import org.example.schoolcrm.infrastructure.persistence.entity.NotificationsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationsRepository extends JpaRepository<NotificationsEntity, UUID> {

  @Query(
      value =
          "SELECT COUNT(n) FROM NotificationsEntity n WHERE n.user.id = :userId AND n.read = false")
  Long getCountOfUnreadNotificationsByUser(@Param("userId") UUID userId);

  Optional<NotificationsEntity> findByIdAndUserIdAndRead(UUID id, UUID userId, boolean read);

  @Modifying
  @Query(
      value =
          "UPDATE NotificationsEntity n SET n.read = true WHERE n.user.id = :userId AND n.read = false")
  void readAllNotificationsByUser(@Param("userId") UUID userId);

  void deleteAllByUserId(UUID userId);

  @Query(
      "SELECT n FROM NotificationsEntity n WHERE n.user.id = :userId ORDER BY n.read ASC, n.createdAt DESC")
  Page<NotificationsEntity> findByUserId(@Param("userId") UUID userId, Pageable pageable);
}
