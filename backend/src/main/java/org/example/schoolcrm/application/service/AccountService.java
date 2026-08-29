package org.example.schoolcrm.application.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.account.AccountInfoResponse;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

  private final UserService userService;

  public AccountInfoResponse getAccountInfo(UserPrincipal principal) {
    val id = principal.userId();

    val user = userService.findById(id);

    return new AccountInfoResponse(
        user.getRole(),
        user.getSchool().getId(),
        user.getId(),
        user.getFirstName(),
        user.getLastName());
  }
}
