package org.example.schoolcrm.infrastructure.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.annotation.PostConstruct;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Pattern;
import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.infrastructure.config.JwtProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtProvider {
  private final JwtProperties jwtProperties;

  private static final String KEYS_REGEX = "-----.*?-----|\\s+";
  private static final String ALGORITHM = "RSA";
  private static final String ROLE_FIELD = "role";
  private static final String SCHOOL_ID_FIELD = "schoolId";
  private static final String PASSWORD_LAST_CHANGED_AT_FIELD = "passwordLastChangedAt";

  private PrivateKey privateKey;
  private PublicKey publicKey;

  private final Logger log = LoggerFactory.getLogger(JwtProvider.class);

  @PostConstruct
  public void setKeys()
      throws java.io.IOException,
          java.security.NoSuchAlgorithmException,
          java.security.spec.InvalidKeySpecException {
    privateKey = loadPrivateKey();
    publicKey = loadPublicKey();
  }

  public String generateAccessToken(
      UUID userId, String role, UUID schoolId, Instant passwordLastChangedAt) {
    var builder =
        Jwts.builder()
            .subject(userId.toString())
            .claim(ROLE_FIELD, role)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + jwtProperties.getExpirationInMs()));

    if (schoolId != null) {
      builder.claim(SCHOOL_ID_FIELD, schoolId.toString());
    }

    if (passwordLastChangedAt != null) {
      builder.claim(PASSWORD_LAST_CHANGED_AT_FIELD, passwordLastChangedAt.getEpochSecond());
    }

    return builder.signWith(privateKey).compact();
  }

  public Claims parseToken(String token) {
    return Jwts.parser().verifyWith(publicKey).build().parseSignedClaims(token).getPayload();
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parser().verifyWith(publicKey).build().parseSignedClaims(token);
      return true;
    } catch (MalformedJwtException e) {
      log.info("Invalid JWT token.");
    } catch (ExpiredJwtException e) {
      log.info("Expired JWT token.");
    } catch (UnsupportedJwtException e) {
      log.info("Unsupported JWT token.");
    } catch (IllegalArgumentException e) {
      log.info("JWT token compact of handler are invalid.");
    }
    return false;
  }

  private PrivateKey loadPrivateKey()
      throws java.io.IOException,
          java.security.NoSuchAlgorithmException,
          java.security.spec.InvalidKeySpecException {
    var key =
        new ClassPathResource(jwtProperties.getPrivateKeyPath()).getInputStream().readAllBytes();
    var sanitizedKey = prepareRsaKeys(new String(key));
    var decoded = Base64.getDecoder().decode(sanitizedKey);
    var spec = new PKCS8EncodedKeySpec(decoded);

    return KeyFactory.getInstance(ALGORITHM).generatePrivate(spec);
  }

  private PublicKey loadPublicKey()
      throws java.io.IOException,
          java.security.NoSuchAlgorithmException,
          java.security.spec.InvalidKeySpecException {
    var key =
        new ClassPathResource(jwtProperties.getPublicKeyPath()).getInputStream().readAllBytes();
    var sanitizedKey = prepareRsaKeys(new String(key));
    var decoded = Base64.getDecoder().decode(sanitizedKey);
    var spec = new X509EncodedKeySpec(decoded);

    return KeyFactory.getInstance(ALGORITHM).generatePublic(spec);
  }

  private String prepareRsaKeys(String rawKey) {
    var pattern = Pattern.compile(KEYS_REGEX);
    return pattern.matcher(rawKey).replaceAll("").replaceAll("\\s", "");
  }
}
