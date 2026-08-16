package org.example.schoolcrm.application.service;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.UserMapper;
import org.example.schoolcrm.application.service.mail.MailService;
import org.example.schoolcrm.common.exception.system.EmailNotSentException;
import org.example.schoolcrm.common.exception.validation.UserAlreadyExistsException;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.domain.UserRoles;
import org.example.schoolcrm.web.dto.registration.UserRegistrationDto;
import org.example.schoolcrm.web.dto.registration.UserRegistrationResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationService {

  private final SchoolService schoolService;
  private final UserService userService;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final EmailVerificationService emailVerificationService;
  private final MailService mailService;

  public UserRegistrationResponse register(UserRegistrationDto userRegistrationDto) {
    if (userService.findByEmail(userRegistrationDto.email()) != null) {
      throw new UserAlreadyExistsException();
    }

    val storedSchool = schoolService.createSchool(userRegistrationDto.schoolName());

    val user = userMapper.registerUser(userRegistrationDto);

    user.setSchool(storedSchool);
    user.setRole(UserRoles.SUPER_ADMIN);

    val hashedPassword = passwordEncoder.encode(userRegistrationDto.password());
    user.setPassword(hashedPassword);

    val storedUser = userService.save(user);

    val token =
        emailVerificationService.generateVerificationCode(storedUser, MailType.REGISTRATION);

    try {
      mailService.sendVerificationMail(storedUser.getEmail(), token);

      return new UserRegistrationResponse(storedUser.getEmail());
    } catch (MessagingException e) {
      throw new EmailNotSentException();
    }
  }
}
