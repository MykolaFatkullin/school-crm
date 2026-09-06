package org.example.schoolcrm.infrastructure.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.infrastructure.security.JwtAuthenticationResolver;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
  private static final String AUTHORIZATION_HEADER = "Authorization";
  private static final String BEARER_PREFIX = "Bearer ";

  private final JwtAuthenticationResolver jwtAuthenticationResolver;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
    try {
      val header = request.getHeader(AUTHORIZATION_HEADER);

      if (header != null && header.startsWith(BEARER_PREFIX)) {
        val token = header.substring(BEARER_PREFIX.length());

        val auth = jwtAuthenticationResolver.resolveAuthentication(token);

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
}
