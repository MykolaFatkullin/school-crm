package org.example.schoolcrm.common.exception.not_found;

import java.util.UUID;

public class UserNotFoundException extends NotFoundException {
  public UserNotFoundException(UUID id) {
    super("User not found by id: " + id);
  }

  public UserNotFoundException(String email) {
    super("User not found by email: " + email);
  }
}
