package org.example.schoolcrm.application.service;

import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.common.exception.InvalidRefreshTokenException;
import org.example.schoolcrm.infrastructure.persistence.entity.RefreshTokenEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenEntity create(UUID userId, Instant expiresAt) {
        var tokenEntity = RefreshTokenEntity.builder()
                .id(UUID.randomUUID())
                .userId(userId)
                .expiresAt(expiresAt)
                .token(UUID.randomUUID())
                .build();

        return refreshTokenRepository.save(tokenEntity);
    }

    public RefreshTokenEntity validate(UUID token) {
        return refreshTokenRepository.findByToken(token)
                .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
                .orElseThrow(InvalidRefreshTokenException::new);
    }

    public void delete(UUID tokenId) {
        refreshTokenRepository.deleteById(tokenId);
    }
}
