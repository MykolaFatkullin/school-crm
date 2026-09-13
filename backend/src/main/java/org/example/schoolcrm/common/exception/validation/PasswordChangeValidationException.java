package org.example.schoolcrm.common.exception.validation;

import org.example.schoolcrm.common.exception.FieldError;

public class PasswordChangeValidationException extends ValidationException {
  public PasswordChangeValidationException(String message, FieldError fieldError) {
    super(message, fieldError);
  }
}
