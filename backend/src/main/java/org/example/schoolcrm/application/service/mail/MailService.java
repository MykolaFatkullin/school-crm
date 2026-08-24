package org.example.schoolcrm.application.service.mail;

import jakarta.mail.MessagingException;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.application.service.EmailVerificationService;
import org.example.schoolcrm.application.service.UserService;
import org.example.schoolcrm.common.exception.system.EmailNotSentException;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.infrastructure.config.AppProperties;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

  private final AppProperties appProperties;

  private final ThymeleafEmailTemplateService templateService;
  private final SmtpMailSender mailSender;
  private final UserService userService;
  private final EmailVerificationService emailVerificationService;

  public void sendVerificationMail(String email, UUID token) throws MessagingException {
    val url =
        UriComponentsBuilder.fromUriString(appProperties.getFrontendUrl())
            .path("/email-verification/")
            .path(token.toString())
            .toUriString();
    val html =
        templateService.buildWelcomeEmailTemplate(
            url, (long) appProperties.getMailTokenExpirationInMinutes());

    mailSender.sendMailFromSystem(email, html, MailType.REGISTRATION);
  }

  public void sendResetPasswordMail(UUID token, String firstName, String email)
      throws MessagingException {
    val url =
        UriComponentsBuilder.fromUriString(appProperties.getFrontendUrl())
            .path("/set-new-password/")
            .path(token.toString())
            .toUriString();

    val html =
        templateService.buildResetPasswordTemplate(
            url, firstName, (long) appProperties.getResetPasswordExpirationInMinutes());

    mailSender.sendMailFromSystem(email, html, MailType.RESET_PASSWORD);
  }

  public void resendVerificationMail(String email, MailType type) {
    val userOptional = userService.findByEmail(email);

    if (userOptional.isEmpty()) {
      log.debug("User with email {} not found", email);
      return;
    }

    val user = userOptional.get();

    if (type == MailType.REGISTRATION && user.isActivated()) {
      return;
    }

    resendVerificationMail(user, type);
  }

  public void resendVerificationMail(@NotNull UUID token) {
    val verificationToken = emailVerificationService.getStoredToken(token);
    val user = verificationToken.getUser();
    val type = verificationToken.getType();

    if (type == MailType.REGISTRATION && user.isActivated()) {
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
