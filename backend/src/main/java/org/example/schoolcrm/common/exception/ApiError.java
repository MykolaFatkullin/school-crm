package org.example.schoolcrm.common.exception;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ApiError {

  private String message;

  private ErrorTypes errorType;

  private List<FieldError> fieldErrors;
}
