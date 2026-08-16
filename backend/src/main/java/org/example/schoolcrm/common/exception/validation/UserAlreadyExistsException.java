package org.example.schoolcrm.common.exception.validation;

import org.example.schoolcrm.common.exception.FieldError;

public class UserAlreadyExistsException extends ValidationException {
  public UserAlreadyExistsException() {
    super(
        "User with given email already exists",
        new FieldError("email", "User with given email already exists"));
  }
}
