package org.example.schoolcrm.web.dto.account;

import java.util.UUID;
import org.example.schoolcrm.domain.UserRoles;

public record AccountInfoResponse(UserRoles role, UUID id, String firstName, String lastName) {}
