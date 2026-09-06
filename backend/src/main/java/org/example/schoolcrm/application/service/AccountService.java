package org.example.schoolcrm.application.service;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.AccountMapper;
import org.example.schoolcrm.application.service.notifications.NotificationsService;
import org.example.schoolcrm.web.dto.account.AccountInfoResponse;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

  private final UserService userService;
  private final AccountMapper accountMapper;
  private final NotificationsService notificationsService;

  public AccountInfoResponse getAccountInfo(UUID userId) {
    val user = userService.findById(userId);

    return accountMapper.userToAccountInfoResponse(user);
  }
}
