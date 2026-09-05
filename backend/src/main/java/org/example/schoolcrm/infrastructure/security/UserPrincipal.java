package org.example.schoolcrm.infrastructure.security;

import java.util.UUID;

public record UserPrincipal(UUID userId, UUID schoolId) {

  @Override
  public String toString() {
    return userId.toString();
  }
}
