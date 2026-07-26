package org.example.schoolcrm.common.exception.auth;

public class InvalidRefreshTokenException extends AuthException {

  public InvalidRefreshTokenException() {
    super("Invalid or expired refresh token");
  }
}
