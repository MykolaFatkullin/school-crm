package org.example.schoolcrm.infrastructure.security;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.infrastructure.config.JwtProperties;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationResolver {

  private final JwtProvider jwtProvider;
  private final JwtProperties jwtProperties;

  public UsernamePasswordAuthenticationToken resolveAuthentication(String token) {
    if (!jwtProvider.validateToken(token)) {
      log.warn("Invalid JWT token provided");
      return null;
    }

    val claims = jwtProvider.parseToken(token);
    val userId = UUID.fromString(claims.getSubject());
    val issuedAt = claims.getIssuedAt();

    if (issuedAt == null) {
      log.warn("IssuedAt is null");
      return null;
    }

    val passwordLastChangedAtSec = claims.get("passwordLastChangedAt", Long.class);
    if (passwordLastChangedAtSec != null) {
      val passwordLastChangedAt = Instant.ofEpochSecond(passwordLastChangedAtSec);
      if (passwordLastChangedAt
          .minusSeconds(jwtProperties.getPasswordChangeLeewaySeconds())
          .isAfter(issuedAt.toInstant())) {
        log.warn(
            "Password changed after token issued. Last changed: {}, Token issued: {}",
            passwordLastChangedAt,
            issuedAt.toInstant());
        return null;
      }
    }

    val role = claims.get("role", String.class);
    val schoolIdString = claims.get("schoolId", String.class);
    UUID schoolId = schoolIdString != null ? UUID.fromString(schoolIdString) : null;

    val user = new UserPrincipal(userId, schoolId);
    val authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

    return new UsernamePasswordAuthenticationToken(user, null, authorities);
  }
}
