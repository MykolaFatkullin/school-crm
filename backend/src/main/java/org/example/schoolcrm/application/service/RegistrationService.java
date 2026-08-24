package org.example.schoolcrm.application.service;

import jakarta.mail.MessagingException;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.application.mapper.UserMapper;
import org.example.schoolcrm.application.service.mail.MailService;
import org.example.schoolcrm.common.exception.validation.UserAlreadyExistsException;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.domain.UserRoles;
import org.example.schoolcrm.web.dto.registration.UserRegistrationDto;
import org.example.schoolcrm.web.dto.registration.UserRegistrationResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegistrationService {

  private final SchoolService schoolService;
  private final UserService userService;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final EmailVerificationService emailVerificationService;
  private final MailService mailService;

  @Transactional
  public UserRegistrationResponse register(UserRegistrationDto userRegistrationDto) {
    if (userService.findByEmail(userRegistrationDto.email()).isEmpty()) {
      throw new UserAlreadyExistsException();
    }

    val storedSchool = schoolService.createSchool(userRegistrationDto.schoolName());

    val user = userMapper.registerUser(userRegistrationDto);

    user.setSchool(storedSchool);
    user.setRole(UserRoles.ADMIN);
    user.setPasswordLastChangedAt(Instant.now());

    val hashedPassword = passwordEncoder.encode(userRegistrationDto.password());
    user.setPassword(hashedPassword);

    val storedUser = userService.save(user);

    val token =
        emailVerificationService.generateVerificationCode(storedUser, MailType.REGISTRATION);

    TransactionSynchronizationManager.registerSynchronization(
        new TransactionSynchronization() {
          @Override
          public void afterCommit() {
            try {
              mailService.sendVerificationMail(storedUser.getEmail(), token);
            } catch (MessagingException e) {
              log.error("Failed to send verification email to {}", storedUser.getEmail(), e);
            }
          }
        });

    return new UserRegistrationResponse(storedUser.getEmail());
  }
}
