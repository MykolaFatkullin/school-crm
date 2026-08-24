package org.example.schoolcrm.infrastructure.persistence.repository;

import java.util.Optional;
import java.util.UUID;
import org.example.schoolcrm.infrastructure.persistence.entity.RefreshTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, UUID> {

  Optional<RefreshTokenEntity> findByToken(UUID token);

  void deleteByToken(UUID token);

  void deleteByUserId(UUID userId);
}
