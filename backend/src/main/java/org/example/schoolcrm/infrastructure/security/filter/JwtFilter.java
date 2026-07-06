package org.example.schoolcrm.infrastructure.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.schoolcrm.infrastructure.security.JwtProvider;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().contains("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            var header = request.getHeader(AUTHORIZATION_HEADER);

            if (header != null && header.startsWith(BEARER_PREFIX)) {
                var token = header.substring(BEARER_PREFIX.length());

                var auth = getAuthentication(token);

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String token) {
        if (!jwtProvider.validateToken(token)) {
            return null;
        }

        var claims = jwtProvider.parseToken(token);

        var userId = UUID.fromString(claims.getSubject());
        var role = claims.get("role", String.class);
        var schoolIdString = claims.get("schoolId", String.class);

        UUID schoolId = schoolIdString != null ? UUID.fromString(schoolIdString) : null;

        var user = new UserPrincipal(userId, schoolId);
        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

        return new UsernamePasswordAuthenticationToken(user, null, authorities);
    }
}
