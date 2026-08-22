package org.example.schoolcrm.application.service.mail;

import jakarta.mail.MessagingException;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.application.service.EmailVerificationService;
import org.example.schoolcrm.application.service.UserService;
import org.example.schoolcrm.common.exception.system.EmailNotSentException;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

  @Value("${app.frontend-url}")
  private final String frontendUrl;

  private final ThymeleafEmailTemplateService templateService;
  private final SmtpMailSender mailSender;
  private final UserService userService;
  private final EmailVerificationService emailVerificationService;

  public void sendVerificationMail(String email, UUID token) throws MessagingException {
    String url = frontendUrl + "/email-verification/" + token;

    String html = templateService.buildWelcomeEmailTemplate(url);

    mailSender.sendMailFromSystem(email, html, MailType.REGISTRATION);
  }

  public void sendResetPasswordMail(UUID token, String firstName, String email)
      throws MessagingException {
    String url = frontendUrl + "/set-new-password/" + token;

    String html = templateService.buildResetPasswordTemplate(url, firstName);

    mailSender.sendMailFromSystem(email, html, MailType.RESET_PASSWORD);
  }

  public void resendVerificationMail(@NotBlank String email, MailType type) {
    val user = userService.findByEmail(email);

    if (user == null) {
      log.debug("User with email {} not found", email);
      return;
    }

    if (type == MailType.REGISTRATION && Boolean.TRUE.equals(user.getActivated())) {
      return;
    }

    resendVerificationMail(user, type);
  }

  public void resendVerificationMail(@NotNull UUID token) {
    val verificationToken = emailVerificationService.getStoredToken(token);
    val user = verificationToken.getUser();
    val type = verificationToken.getType();

    if (type == MailType.REGISTRATION && Boolean.TRUE.equals(user.getActivated())) {
      return;
    }

    resendVerificationMail(user, type);
  }

  private void resendVerificationMail(UserEntity user, MailType type) {
    val token = emailVerificationService.generateVerificationCode(user, type);
    try {
      if (type == MailType.RESET_PASSWORD) {
        sendResetPasswordMail(token, user.getFirstName(), user.getEmail());
      } else {
        sendVerificationMail(user.getEmail(), token);
      }
    } catch (MessagingException e) {
      throw new EmailNotSentException();
    }
  }
}
