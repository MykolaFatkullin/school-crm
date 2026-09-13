package org.example.schoolcrm.infrastructure.config;

import java.util.Base64;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@ConfigurationProperties(prefix = "security.encryption")
public class EncryptionProperties {

  private final byte[] key;

  public EncryptionProperties(String key) {
    this.key = Base64.getDecoder().decode(key);

    if (this.key.length != 32) {
      throw new IllegalArgumentException("Encryption key must be 32 bytes long");
    }
  }
}
