package org.example.schoolcrm.common.exception.validation;

public class VerificationTokenExpiredException extends ValidationException {
  public VerificationTokenExpiredException() {
    super("Verification token has expired.");
  }
}
