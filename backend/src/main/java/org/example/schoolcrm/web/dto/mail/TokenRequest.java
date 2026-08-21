package org.example.schoolcrm.web.dto.mail;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record TokenRequest(@NotNull UUID token) {}
