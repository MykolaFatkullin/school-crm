package org.example.schoolcrm.web;

import static org.example.schoolcrm.web.auth.RefreshTokenCookieFactory.dropRefreshCookies;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.example.schoolcrm.application.service.AccountService;
import org.example.schoolcrm.common.exception.not_found.NotFoundException;
import org.example.schoolcrm.infrastructure.config.AppProperties;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.account.AccountInfoResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
@Slf4j
public class AccountController {

  private final AccountService accountService;
  private final AppProperties appProperties;

  @GetMapping("/me")
  public ResponseEntity<AccountInfoResponse> getAccountInfo(
      @AuthenticationPrincipal UserPrincipal principal) {
    try {
      val accountInfo = accountService.getAccountInfo(principal);
      return ResponseEntity.ok().body(accountInfo);
    } catch (NotFoundException e) {
      log.warn("GET /api/account/me: authenticated user was not found");
      val cookie = dropRefreshCookies(appProperties.getCookies().isSecure());

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .header(HttpHeaders.SET_COOKIE, cookie.toString())
          .build();
    }
  }
}
