package org.example.schoolcrm.infrastructure.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.jspecify.annotations.Nullable;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtChannelInterceptor implements ChannelInterceptor {

  public static final String BEARER_PREFIX = "Bearer ";

  private final JwtAuthenticationResolver jwtAuthenticationResolver;

  @Override
  public @Nullable Message<?> preSend(Message<?> message, MessageChannel channel) {
    val accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

    if (accessor == null) {
      return message;
    }

    if (StompCommand.CONNECT.equals(accessor.getCommand())) {
      val header = accessor.getFirstNativeHeader("Authorization");

      if (header == null || !header.startsWith(BEARER_PREFIX)) {
        log.warn("Missing or malformed Authorization header on STOMP CONNECT");
        throw new MessagingException("Missing Authorization header");
      }

      val token = header.substring(BEARER_PREFIX.length());
      val auth = jwtAuthenticationResolver.resolveAuthentication(token);

      if (auth == null) {
        throw new MessagingException("Invalid token");
      }

      accessor.setUser(auth);
    }

    return message;
  }
}
