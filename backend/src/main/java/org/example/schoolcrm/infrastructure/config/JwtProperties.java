package org.example.schoolcrm.infrastructure.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "security.jwt")
public class JwtProperties {
  private Integer expirationInMs;
  private Integer refreshTokenExpirationInDays;
  private String privateKeyPath;
  private String publicKeyPath;
  private Integer passwordChangeLeewaySeconds;
}
