package org.example.schoolcrm.web;

import jakarta.validation.Valid;
import java.time.Duration;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.service.AuthService;
import org.example.schoolcrm.application.service.EmailVerificationService;
import org.example.schoolcrm.application.service.RegistrationService;
import org.example.schoolcrm.application.service.mail.MailService;
import org.example.schoolcrm.infrastructure.config.AppProperties;
import org.example.schoolcrm.web.dto.auth.AccessTokenResponse;
import org.example.schoolcrm.web.dto.auth.ChangePasswordRequest;
import org.example.schoolcrm.web.dto.auth.LoginRequest;
import org.example.schoolcrm.web.dto.auth.ResetPasswordRequest;
import org.example.schoolcrm.web.dto.auth.UserVerificationResponse;
import org.example.schoolcrm.web.dto.mail.EmailRequest;
import org.example.schoolcrm.web.dto.mail.TokenRequest;
import org.example.schoolcrm.web.dto.registration.UserRegistrationDto;
import org.example.schoolcrm.web.dto.registration.UserRegistrationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AppProperties appProperties;

  @Value("${jwt.refresh-token-expiration-in-days}")
  private final int refreshExpiration;

  private final AuthService authService;
  private final RegistrationService registrationService;
  private final EmailVerificationService emailVerificationService;
  private final MailService mailService;

  @PostMapping("/login")
  public ResponseEntity<AccessTokenResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
    val result = authService.login(loginRequest);

    val cookie = getCookieForRefresh(result.refreshToken(), refreshExpiration);

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new AccessTokenResponse(result.accessToken()));
  }

  @PostMapping("/refresh")
  public ResponseEntity<AccessTokenResponse> refreshToken(
      @CookieValue(value = "refreshToken", required = false) UUID refreshToken) {
    val result = authService.refresh(refreshToken);

    return ResponseEntity.ok()
        .header(
            HttpHeaders.SET_COOKIE,
            getCookieForRefresh(result.refreshToken(), refreshExpiration).toString())
        .body(new AccessTokenResponse(result.accessToken()));
  }

  @PostMapping("/logout")
  public ResponseEntity<Void> logout(
      @CookieValue(value = "refreshToken", required = false) UUID refreshToken) {
    authService.logout(refreshToken);

    val cookie = getCookieForRefresh("", null);

    return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
  }

  @PostMapping("/register")
  public UserRegistrationResponse register(
      @Valid @RequestBody UserRegistrationDto registrationDto) {
    return registrationService.register(registrationDto);
  }

  @PostMapping("/verify-mail-token")
  public UserVerificationResponse verifyMailToken(@RequestBody @Valid TokenRequest request) {
    return emailVerificationService.verifyToken(request.token());
  }

  @PostMapping("/resend-verification-by-email")
  public void resendByEmail(@RequestBody @Valid EmailRequest request) {
    mailService.resendVerificationMail(request.email(), request.type());
  }

  @PostMapping("/resend-verification-by-token")
  public void resendByToken(@RequestBody @Valid TokenRequest request) {
    mailService.resendVerificationMail(request.token());
  }

  @PostMapping("/reset-password")
  public void resetPassword(@RequestBody @Valid ResetPasswordRequest emailRequest) {
    authService.resetPassword(emailRequest.email());
  }

  @PostMapping("/change-password")
  public void changePassword(@RequestBody @Valid ChangePasswordRequest request) {
    authService.changePassword(request);
  }

  private ResponseCookie getCookieForRefresh(String value, Integer maxAge) {
    val cookieBuilder =
        ResponseCookie.from("refreshToken", value)
            .httpOnly(true)
            .secure(appProperties.getCookies().isSecure())
            .sameSite("Strict")
            .path("/");

    if (maxAge == null) {
      return cookieBuilder.maxAge(0).build();
    }

    return cookieBuilder.maxAge(Duration.ofDays(maxAge)).build();
  }
}
