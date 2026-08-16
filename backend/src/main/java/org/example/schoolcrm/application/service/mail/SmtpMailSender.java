package org.example.schoolcrm.application.service.mail;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.domain.MailType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class SmtpMailSender {

  @Value("${app.default-email}")
  private final String defaultEmail;

  private final JavaMailSender javaMailSender;

  public void sendMailFromSystem(String to, String htmlContent, MailType mailType) throws MessagingException {
    val mimeMessage = javaMailSender.createMimeMessage();

    val helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

    mimeMessage.setFrom(defaultEmail);
    mimeMessage.setRecipients(Message.RecipientType.TO, to);
    mimeMessage.setSubject(mailType.getSubject());

    helper.setText(htmlContent, true);

    javaMailSender.send(mimeMessage);
  }
}