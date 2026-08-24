package org.example.schoolcrm.application.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.common.exception.not_found.VerificationTokenNotFoundException;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.domain.MailVerificationResult;
import org.example.schoolcrm.infrastructure.config.AppProperties;
import org.example.schoolcrm.infrastructure.persistence.entity.EmailVerificationTokenEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.EmailVerificationTokenRepository;
import org.example.schoolcrm.web.dto.auth.UserVerificationResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

  private final AppProperties appProperties;

  private final EmailVerificationTokenRepository emailVerificationTokenRepository;
  private final UserService userService;

  @Transactional
  public UUID generateVerificationCode(UserEntity user, MailType type) {
    emailVerificationTokenRepository.deleteAllByUserAndType(user, type);

    val entityBuilder =
        EmailVerificationTokenEntity.builder().token(UUID.randomUUID()).user(user).type(type);

    if (type == MailType.RESET_PASSWORD) {
      entityBuilder.expirationDate(
          Instant.now()
              .plus(appProperties.getResetPasswordExpirationInMinutes(), ChronoUnit.MINUTES));
    } else {
      entityBuilder.expirationDate(
          Instant.now().plus(appProperties.getMailTokenExpirationInMinutes(), ChronoUnit.MINUTES));
    }

    val entity = entityBuilder.build();

    val storedEntity = emailVerificationTokenRepository.save(entity);

    return storedEntity.getToken();
  }

  @Transactional
  public UserVerificationResponse verifyToken(UUID token) {
    val storedToken = getStoredToken(token);

    if (storedToken.getExpirationDate().isBefore(Instant.now())) {
      return new UserVerificationResponse(MailVerificationResult.EXPIRED);
    }

    val user = storedToken.getUser();

    if (user.isActivated() && storedToken.getType() == MailType.REGISTRATION) {
      emailVerificationTokenRepository.delete(storedToken);
      return new UserVerificationResponse(MailVerificationResult.ALREADY_VERIFIED);
    }

    if (storedToken.getType() == MailType.REGISTRATION) {
      user.setActivated(true);
      userService.save(user);
      emailVerificationTokenRepository.delete(storedToken);
    }

    return new UserVerificationResponse(MailVerificationResult.VERIFIED);
  }

  public EmailVerificationTokenEntity getStoredToken(UUID token) {
    return emailVerificationTokenRepository
        .findById(token)
        .orElseThrow(VerificationTokenNotFoundException::new);
  }

  public void dropToken(UUID token) {
    emailVerificationTokenRepository.deleteById(token);
  }
}
