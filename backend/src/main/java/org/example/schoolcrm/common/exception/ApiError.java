package org.example.schoolcrm.common.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ApiError {

  private String message;

  @JsonProperty("error_type")
  private ErrorTypes errorType;

  private List<FieldError> fieldErrors;
}
