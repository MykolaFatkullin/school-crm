package org.example.schoolcrm.common.exception.system;

import org.example.schoolcrm.common.exception.ApiException;
import org.example.schoolcrm.common.exception.ErrorTypes;

public class SystemException extends ApiException {
  public SystemException(String message) {
    super(ErrorTypes.SYSTEM_ERROR, message);
  }
}
