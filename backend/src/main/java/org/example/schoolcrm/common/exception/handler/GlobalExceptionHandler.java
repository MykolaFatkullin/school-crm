package org.example.schoolcrm.common.exception.handler;

import org.example.schoolcrm.common.exception.ApiError;
import org.example.schoolcrm.common.exception.ApiException;
import org.example.schoolcrm.common.exception.ErrorTypes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(ApiException.class)
  public ResponseEntity<ApiError> handleApiException(ApiException exception) {
    var status = mapStatus(exception.getType());

    var apiError = new ApiError(exception.getMessage(), exception.getType());

    return ResponseEntity.status(status).body(apiError);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleException(Exception exception) {
    var status = HttpStatus.INTERNAL_SERVER_ERROR;
    exception.printStackTrace();
    return ResponseEntity.status(status).build();
  }

  private HttpStatus mapStatus(ErrorTypes type) {
    return switch (type) {
      case AUTH_ERROR -> HttpStatus.UNAUTHORIZED;
      case NOT_FOUND_ERROR -> HttpStatus.NOT_FOUND;
    };
  }
}
