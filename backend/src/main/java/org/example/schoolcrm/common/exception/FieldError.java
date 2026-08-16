package org.example.schoolcrm.common.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FieldError {
  private String field;
  private String message;
}
