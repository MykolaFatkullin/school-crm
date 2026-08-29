package org.example.schoolcrm.application.service;

import java.time.Instant;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.common.exception.auth.InvalidRefreshTokenException;
import org.example.schoolcrm.infrastructure.persistence.entity.RefreshTokenEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepository;

  public RefreshTokenEntity create(UUID userId, Instant expiresAt) {
    var tokenEntity =
        RefreshTokenEntity.builder()
            .userId(userId)
            .expiresAt(expiresAt)
            .token(UUID.randomUUID())
            .build();

    return refreshTokenRepository.save(tokenEntity);
  }

  public RefreshTokenEntity validate(UUID token) {
    return refreshTokenRepository
        .findByToken(token)
        .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
        .orElseThrow(InvalidRefreshTokenException::new);
  }

  @Transactional
  public void deleteByToken(UUID tokenId) {
    refreshTokenRepository.deleteByToken(tokenId);
  }

  @Transactional
  public void dropTokenByUser(UUID userId) {
    refreshTokenRepository.deleteByUserId(userId);
  }
}
