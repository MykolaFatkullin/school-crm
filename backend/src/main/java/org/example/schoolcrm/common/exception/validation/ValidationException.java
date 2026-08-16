package org.example.schoolcrm.common.exception.validation;

import lombok.Getter;
import org.example.schoolcrm.common.exception.ApiException;
import org.example.schoolcrm.common.exception.ErrorTypes;
import org.example.schoolcrm.common.exception.FieldError;

@Getter
public class ValidationException extends ApiException {
  private final FieldError[] fieldErrors;

  public ValidationException(String message, FieldError... fieldErrors) {
    this.fieldErrors = fieldErrors;

    super(ErrorTypes.VALIDATION_ERROR, message);
  }
}
