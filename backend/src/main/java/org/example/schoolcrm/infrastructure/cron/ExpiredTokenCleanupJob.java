package org.example.schoolcrm.infrastructure.cron;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.infrastructure.persistence.repository.EmailVerificationTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ExpiredTokenCleanupJob {

  @Value("${app.expired-token-cleanup-after-hours}")
  private Long cleanupAfterHours;

  private final EmailVerificationTokenRepository repository;

  @Scheduled(fixedDelay = 1, timeUnit = TimeUnit.HOURS)
  @Transactional
  public void cleanup() {
    val threshold = Instant.now().minus(cleanupAfterHours, ChronoUnit.HOURS);

    repository.deleteAllByExpirationDateBefore(threshold);
  }
}
