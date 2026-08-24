package org.example.schoolcrm.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MailType {
  REGISTRATION("Confirm your email", "registration-template"),
  RESET_PASSWORD("Reset your SchoolCRM password", "reset-password-template");

  private final String subject;
  private final String bodyPath;
}
