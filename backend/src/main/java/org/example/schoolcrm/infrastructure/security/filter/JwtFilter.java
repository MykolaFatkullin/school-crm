package org.example.schoolcrm.infrastructure.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.infrastructure.security.JwtProvider;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {

  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final String BEARER_PREFIX = "Bearer ";
  private static final int PASSWORD_CHANGE_LEEWAY_SECONDS = 2;

  private final JwtProvider jwtProvider;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
    try {
      val header = request.getHeader(AUTHORIZATION_HEADER);

      if (header != null && header.startsWith(BEARER_PREFIX)) {
        val token = header.substring(BEARER_PREFIX.length());

        val auth = getAuthentication(token);

        if (auth != null) {
          SecurityContextHolder.getContext().setAuthentication(auth);
        }
      }

      filterChain.doFilter(request, response);
    } catch (Exception e) {
      log.error("Exception during JWT processing: {}", e.getMessage(), e);
      SecurityContextHolder.clearContext();
      response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
  }

  private UsernamePasswordAuthenticationToken getAuthentication(String token) {
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
          .minusSeconds(PASSWORD_CHANGE_LEEWAY_SECONDS)
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
