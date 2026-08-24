package org.example.schoolcrm.application.service.mail;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.infrastructure.config.AppProperties;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmtpMailSender {

  private final AppProperties appProperties;

  private final JavaMailSender javaMailSender;

  public void sendMailFromSystem(String to, String htmlContent, MailType mailType)
      throws MessagingException {
    val mimeMessage = javaMailSender.createMimeMessage();

    val helper =
        new MimeMessageHelper(
            mimeMessage,
            MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
            StandardCharsets.UTF_8.name());

    mimeMessage.setFrom(appProperties.getDefaultEmail());
    mimeMessage.setRecipients(Message.RecipientType.TO, to);
    mimeMessage.setSubject(mailType.getSubject());

    helper.setText(htmlContent, true);

    javaMailSender.send(mimeMessage);
  }
}
