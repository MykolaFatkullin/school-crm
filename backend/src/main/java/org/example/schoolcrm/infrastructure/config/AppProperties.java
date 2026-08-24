package org.example.schoolcrm.infrastructure.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {

  private String defaultEmail;
  private String frontendUrl;
  private int mailTokenExpirationInMinutes;
  private int resetPasswordExpirationInMinutes;
  private long expiredTokenCleanupAfterHours;
  private Cookies cookies = new Cookies();

  @Getter
  @Setter
  public static class Cookies {
    private boolean secure;
  }
}
