package org.example.schoolcrm.common.exception;

import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {

  private final ErrorTypes type;

  public ApiException(ErrorTypes errorType, String message) {
    super(message);
    this.type = errorType;
  }
}
