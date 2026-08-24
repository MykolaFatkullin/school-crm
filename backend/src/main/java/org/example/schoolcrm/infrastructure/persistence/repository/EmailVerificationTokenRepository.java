package org.example.schoolcrm.infrastructure.persistence.repository;

import java.time.Instant;
import java.util.UUID;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.infrastructure.persistence.entity.EmailVerificationTokenEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailVerificationTokenRepository
    extends JpaRepository<EmailVerificationTokenEntity, UUID> {
  void deleteAllByUserAndType(UserEntity user, MailType type);

  void deleteAllByExpirationDateBefore(Instant date);
}
