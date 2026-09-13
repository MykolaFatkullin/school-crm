package org.example.schoolcrm.application.service.security;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.common.exception.system.EncryptionException;
import org.example.schoolcrm.infrastructure.config.EncryptionProperties;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AesEncryptionService {

  private static final String ALGORITHM = "AES/DCM/NoPadding";
  private static final int IV_LENGTH = 12;
  private static final int TAG_LENGTH = 128;

  private final EncryptionProperties encryptionProperties;
  private final SecureRandom secureRandom = new SecureRandom();

  public String encrypt(String plainText) {
    if (plainText == null) {
      return null;
    }

    try {
      val iv = new byte[IV_LENGTH];
      secureRandom.nextBytes(iv);

      val cipher = Cipher.getInstance(ALGORITHM);
      val keySpec = new SecretKeySpec(encryptionProperties.getKey(), "AES");
      val gcmParameterSpec = new GCMParameterSpec(TAG_LENGTH, iv);
      cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmParameterSpec);

      val encrypted = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

      return Base64.getEncoder()
          .encodeToString(
              ByteBuffer.allocate(iv.length + encrypted.length).put(iv).put(encrypted).array());
    } catch (GeneralSecurityException e) {
      log.error("Failed to encrypt the value", e);
      throw new EncryptionException("Failed to encrypt the value");
    }
  }

  public String decrypt(String cipherText) {
    if (cipherText == null) {
      return null;
    }

    try {
      val combined = Base64.getDecoder().decode(cipherText);

      val buffer = ByteBuffer.wrap(combined);

      val iv = new byte[IV_LENGTH];
      buffer.get(iv);

      val encrypted = new byte[buffer.remaining()];
      buffer.get(encrypted);

      val cipher = Cipher.getInstance(ALGORITHM);
      val keySpec = new SecretKeySpec(encryptionProperties.getKey(), "AES");
      val gcmParameterSpec = new GCMParameterSpec(TAG_LENGTH, iv);
      cipher.init(Cipher.DECRYPT_MODE, keySpec, gcmParameterSpec);

      val decrypted = cipher.doFinal(encrypted);

      return new String(decrypted, StandardCharsets.UTF_8);
    } catch (GeneralSecurityException | IllegalArgumentException e) {
      log.error("Failed to decrypt the value", e);
      throw new EncryptionException("Failed to decrypt the value");
    }
  }
}
