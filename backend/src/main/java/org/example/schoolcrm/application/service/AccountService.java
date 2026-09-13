package org.example.schoolcrm.application.service;

import java.time.Instant;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.AccountMapper;
import org.example.schoolcrm.application.service.auth.RefreshTokenService;
import org.example.schoolcrm.common.exception.FieldError;
import org.example.schoolcrm.common.exception.validation.PasswordChangeValidationException;
import org.example.schoolcrm.web.dto.account.AccountInfoResponse;
import org.example.schoolcrm.web.dto.account.ChangeAccountPasswordDto;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountService {

  private final UserService userService;
  private final AccountMapper accountMapper;
  private final PasswordEncoder passwordEncoder;
  private final RefreshTokenService refreshTokenService;

  public AccountInfoResponse getAccountInfo(UUID userId) {
    val user = userService.findById(userId);

    return accountMapper.userToAccountInfoResponse(user);
  }

  @Transactional
  public void changeAccountPassword(
      UUID userId, ChangeAccountPasswordDto changeAccountPasswordDto) {
    val user = userService.findById(userId);

    if (!passwordEncoder.matches(changeAccountPasswordDto.oldPassword(), user.getPassword())) {
      val message = "Current password is incorrect";
      val fieldError = new FieldError("oldPassword", message);
      throw new PasswordChangeValidationException(message, fieldError);
    }

    if (passwordEncoder.matches(changeAccountPasswordDto.newPassword(), user.getPassword())) {
      val message = "New password cannot be the same as the current password";
      val fieldError = new FieldError("newPassword", message);
      throw new PasswordChangeValidationException(message, fieldError);
    }

    user.setPassword(passwordEncoder.encode(changeAccountPasswordDto.newPassword()));
    user.setPasswordLastChangedAt(Instant.now());

    refreshTokenService.dropTokenByUser(user.getId());
  }
}
