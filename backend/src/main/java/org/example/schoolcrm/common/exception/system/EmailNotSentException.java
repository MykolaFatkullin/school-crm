package org.example.schoolcrm.common.exception.system;

public class EmailNotSentException extends SystemException {
  public EmailNotSentException() {
    super("An unexpected error occurred while sending email.");
  }
}
