package org.example.schoolcrm.common.exception.handler;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.common.exception.ApiError;
import org.example.schoolcrm.common.exception.ApiException;
import org.example.schoolcrm.common.exception.ErrorTypes;
import org.example.schoolcrm.common.exception.FieldError;
import org.example.schoolcrm.common.exception.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException exception) {
    val status = HttpStatus.BAD_REQUEST;
    log.error("Validation failed: {}", exception.getMessage());
    val fieldErrors =
        exception.getBindingResult().getFieldErrors().stream()
            .map(error -> new FieldError(error.getField(), error.getDefaultMessage()))
            .toList();

    val message = "Validation of object failed. Check details in FieldError";

    val apiError = new ApiError(message, ErrorTypes.VALIDATION_ERROR, fieldErrors);

    return ResponseEntity.status(status).body(apiError);
  }

  @ExceptionHandler(ApiException.class)
  public ResponseEntity<ApiError> handleApiException(ApiException exception) {
    val status = mapStatus(exception.getType());
    log.error("Validation failed: {}", exception.getMessage());

    List<FieldError> fieldErrors = null;

    if (exception instanceof ValidationException validationException) {
      fieldErrors = List.of(validationException.getFieldErrors());
    }

    val apiError = new ApiError(exception.getMessage(), exception.getType(), fieldErrors);

    return ResponseEntity.status(status).body(apiError);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleException(Exception exception) {
    val status = HttpStatus.INTERNAL_SERVER_ERROR;
    log.error("Validation failed: {}", exception.getMessage());

    val apiError = new ApiError("An unexpected error occurred", ErrorTypes.SYSTEM_ERROR, null);

    return ResponseEntity.status(status).body(apiError);
  }

  private HttpStatus mapStatus(ErrorTypes type) {
    return switch (type) {
      case AUTH_ERROR -> HttpStatus.UNAUTHORIZED;
      case NOT_FOUND_ERROR -> HttpStatus.NOT_FOUND;
      case VALIDATION_ERROR -> HttpStatus.BAD_REQUEST;
      case SYSTEM_ERROR -> HttpStatus.INTERNAL_SERVER_ERROR;
    };
  }
}
