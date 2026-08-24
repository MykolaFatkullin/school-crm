package org.example.schoolcrm.common.exception;

import java.io.Serial;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FieldError implements Serializable {
  @Serial private static final long serialVersionUID = 1L;
  private String field;
  private String message;
}
