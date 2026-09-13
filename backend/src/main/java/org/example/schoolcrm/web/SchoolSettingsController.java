package org.example.schoolcrm.web;

import static org.example.schoolcrm.common.Constants.SCHOOL_PREFIX;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.service.SchoolSettingsService;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(SCHOOL_PREFIX)
@RequiredArgsConstructor
public class SchoolSettingsController {

  private final SchoolSettingsService schoolSettingsService;

  @PutMapping("/settings/smtp")
  public ResponseEntity<SchoolSmtpSettingsDto> updateSmtpSettings(
      @AuthenticationPrincipal UserPrincipal principal,
      @RequestBody @Valid SchoolSmtpSettingsDto schoolSmtpSettingsDto) {
    val settings =
        schoolSettingsService.updateSmtpSettings(principal.schoolId(), schoolSmtpSettingsDto);

    return ResponseEntity.ok(settings);
  }

  @GetMapping("/settings/smtp")
  public ResponseEntity<SchoolSmtpSettingsDto> getSmtpSettings(
      @AuthenticationPrincipal UserPrincipal principal) {
    val settings = schoolSettingsService.getSmtpSettings(principal.schoolId());

    return ResponseEntity.ok(settings);
  }

  @PutMapping("/settings/payment")
  public ResponseEntity<SchoolPaymentSettingsDto> updatePaymentSettings(
      @AuthenticationPrincipal UserPrincipal principal,
      @RequestBody @Valid SchoolPaymentSettingsDto schoolPaymentSettingsDto) {
    val settings =
        schoolSettingsService.updatePaymentSettings(principal.schoolId(), schoolPaymentSettingsDto);

    return ResponseEntity.ok(settings);
  }

  @GetMapping("/settings/payment")
  public ResponseEntity<SchoolPaymentSettingsDto> getPaymentSettings(
      @AuthenticationPrincipal UserPrincipal principal) {
    val settings = schoolSettingsService.getPaymentSettings(principal.schoolId());

    return ResponseEntity.ok(settings);
  }
}
