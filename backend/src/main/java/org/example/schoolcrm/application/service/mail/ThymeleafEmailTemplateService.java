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

  public String buildWelcomeEmailTemplate(String confirmationUrl) {
    val context = new Context();

    context.setVariable("confirmationUrl", confirmationUrl);

    return templateEngine.process(MailType.REGISTRATION.getBodyPath(), context);
  }

  public String buildResetPasswordTemplate(String confirmationUrl, String firstName) {
    val context = new Context();

    context.setVariable("resetPasswordUrl", confirmationUrl);
    context.setVariable("firstName", firstName);

    return templateEngine.process(MailType.RESET_PASSWORD.getBodyPath(), context);
  }
}
