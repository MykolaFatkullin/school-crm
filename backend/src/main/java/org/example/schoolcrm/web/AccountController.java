package org.example.schoolcrm.web;

import static org.example.schoolcrm.common.Constants.ACCOUNT_PREFIX;
import static org.example.schoolcrm.web.auth.RefreshTokenCookieFactory.dropRefreshCookie;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.application.service.AccountService;
import org.example.schoolcrm.application.service.auth.AuthService;
import org.example.schoolcrm.common.exception.not_found.NotFoundException;
import org.example.schoolcrm.infrastructure.config.AppProperties;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.account.AccountInfoResponse;
import org.example.schoolcrm.web.dto.account.ChangeAccountPasswordDto;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(ACCOUNT_PREFIX)
@RequiredArgsConstructor
@Slf4j
public class AccountController {

  private final AccountService accountService;
  private final AppProperties appProperties;
  private final AuthService authService;

  @GetMapping("/me")
  public ResponseEntity<AccountInfoResponse> getAccountInfo(
      @CookieValue(value = "refreshToken", required = false) UUID refreshToken,
      @AuthenticationPrincipal UserPrincipal principal) {
    try {
      val accountInfo = accountService.getAccountInfo(principal.userId());
      return ResponseEntity.ok().body(accountInfo);
    } catch (NotFoundException e) {
      log.warn("GET /api/account/me: authenticated user was not found, id={}", principal.userId());
      authService.logout(refreshToken);
      val cookie = dropRefreshCookie(appProperties.getCookies().isSecure());

      return ResponseEntity.status(HttpStatus.FORBIDDEN)
          .header(HttpHeaders.SET_COOKIE, cookie.toString())
          .build();
    }
  }

  @PatchMapping("/change-password")
  public ResponseEntity<Void> changeAccountPassword(
      @AuthenticationPrincipal UserPrincipal principal,
      @RequestBody ChangeAccountPasswordDto changeAccountPasswordDto) {
    accountService.changeAccountPassword(principal.userId(), changeAccountPasswordDto);
    val cookie = dropRefreshCookie(appProperties.getCookies().isSecure());

    return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
  }
}
