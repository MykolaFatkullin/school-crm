package org.example.schoolcrm.common.exception.not_found;

public class VerificationTokenNotFoundException extends NotFoundException {
  public VerificationTokenNotFoundException() {
    super("Verification token not found");
  }
}
