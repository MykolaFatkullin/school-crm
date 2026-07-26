package org.example.schoolcrm.common.exception.auth;

import static org.example.schoolcrm.common.exception.ErrorTypes.AUTH_ERROR;

import org.example.schoolcrm.common.exception.ApiException;

public class AuthException extends ApiException {
  public AuthException(String message) {
    super(AUTH_ERROR, message);
  }
}
