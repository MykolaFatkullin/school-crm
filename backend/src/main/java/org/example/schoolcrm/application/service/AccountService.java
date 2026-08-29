package org.example.schoolcrm.application.service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.AccountMapper;
import org.example.schoolcrm.web.dto.account.AccountInfoResponse;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountService {

  private final UserService userService;
  private final AccountMapper accountMapper;

  public AccountInfoResponse getAccountInfo(UUID userId) {
    val user = userService.findById(userId);

    return accountMapper.userToAccountInfoResponse(user);
  }
}
