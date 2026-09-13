package org.example.schoolcrm.common.exception.not_found;

import java.util.UUID;

public class SchoolNotFoundByUserException extends NotFoundException {

  public SchoolNotFoundByUserException(UUID userId) {
    super("School not found by user id: " + userId);
  }
}
