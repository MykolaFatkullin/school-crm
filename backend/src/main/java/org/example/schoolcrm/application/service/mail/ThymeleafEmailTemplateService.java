package org.example.schoolcrm.application.service.mail;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.domain.MailType;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class ThymeleafEmailTemplateService {

  private final TemplateEngine templateEngine;

  public String buildWelcomeEmailTemplate(String confirmationUrl, long expirationInMinutes) {
    val context = new Context();

    context.setVariable("confirmationUrl", confirmationUrl);
    context.setVariable("expirationTime", formatExpirationTime(expirationInMinutes));

    return templateEngine.process(MailType.REGISTRATION.getBodyPath(), context);
  }

  public String buildResetPasswordTemplate(
      String confirmationUrl, String firstName, long expirationInMinutes) {
    val context = new Context();

    context.setVariable("resetPasswordUrl", confirmationUrl);
    context.setVariable("firstName", firstName);
    context.setVariable("expirationTime", formatExpirationTime(expirationInMinutes));

    return templateEngine.process(MailType.RESET_PASSWORD.getBodyPath(), context);
  }

  private String formatExpirationTime(long minutes) {
    if (minutes < 60) {
      return minutes + " minute" + (minutes == 1 ? "" : "s");
    }
    long hours = minutes / 60;
    return hours + " hour" + (hours == 1 ? "" : "s");
  }
}
