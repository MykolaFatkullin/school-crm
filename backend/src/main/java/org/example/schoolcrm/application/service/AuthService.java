package org.example.schoolcrm.application.service;

import jakarta.mail.MessagingException;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.service.mail.MailService;
import org.example.schoolcrm.common.exception.auth.AuthException;
import org.example.schoolcrm.common.exception.system.EmailNotSentException;
import org.example.schoolcrm.domain.MailType;
import org.example.schoolcrm.domain.model.LoginResult;
import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.infrastructure.security.JwtProvider;
import org.example.schoolcrm.web.dto.auth.ChangePasswordRequest;
import org.example.schoolcrm.web.dto.auth.LoginRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final RefreshTokenService refreshTokenService;
  private final JwtProvider jwtProvider;
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final MailService mailService;
  private final EmailVerificationService emailVerificationService;

  @Value("${jwt.refresh-token-expiration-in-days}")
  private final int refreshExpiration;

  public LoginResult login(LoginRequest loginRequest) {
    var user = userService.findByEmail(loginRequest.email());

    if (user == null) {
      throw new AuthException("Unauthorized");
    }

    if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
      throw new AuthException("Invalid password");
    }

    if (Boolean.FALSE.equals(user.getActivated())) {
      throw new AuthException("Unauthorized");
    }

    var jwt =
        jwtProvider.generateAccessToken(user.getId(), user.getRole().name(), getSchoolId(user));

    var expiresAt = Instant.now().plus(refreshExpiration, ChronoUnit.DAYS);

    var refresh = refreshTokenService.create(user.getId(), expiresAt);

    return new LoginResult(jwt, refresh.getToken().toString());
  }

  public LoginResult refresh(UUID refreshToken) {
    if (refreshToken == null) {
      throw new AuthException("Unauthorized");
    }

    var existing = refreshTokenService.validate(refreshToken);

    refreshTokenService.delete(existing.getToken());

    var user = userService.findById(existing.getUserId());

    var access =
        jwtProvider.generateAccessToken(user.getId(), user.getRole().name(), getSchoolId(user));

    var newToken = refreshTokenService.create(user.getId(), existing.getExpiresAt());

    return new LoginResult(access, newToken.getToken().toString());
  }

  public void logout(UUID refreshToken) {
    if (refreshToken == null) {
      return;
    }

    refreshTokenService.delete(refreshToken);
  }

  public void resetPassword(@NotBlank String email) {
    val storedUser = userService.findByEmail(email);

    if (storedUser == null) {
      return;
    }

    val token =
        emailVerificationService.generateVerificationCode(storedUser, MailType.RESET_PASSWORD);

    try {
      mailService.sendResetPasswordMail(token, storedUser.getFirstName(), storedUser.getEmail());
    } catch (MessagingException e) {
      throw new EmailNotSentException();
    }
  }

  @Transactional
  public void changePassword(ChangePasswordRequest request) {
    val tokenEntity = emailVerificationService.getStoredToken(request.token());
    val user = tokenEntity.getUser();

    if (tokenEntity.getType() != MailType.RESET_PASSWORD
        || tokenEntity.getExpirationDate().isBefore(Instant.now())) {
      throw new AuthException("Invalid token");
    }

    user.setPassword(passwordEncoder.encode(request.password()));
    user.setPasswordLastChangedAt(Instant.now());
    userService.save(user);
    emailVerificationService.dropToken(request.token());
    refreshTokenService.dropTokenByUser(user);
  }

  private UUID getSchoolId(UserEntity user) {
    return user.getSchool() != null ? user.getSchool().getId() : null;
  }
}
