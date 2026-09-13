package org.example.schoolcrm.web;

import static org.example.schoolcrm.common.Constants.SCHOOL_PREFIX;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.service.SchoolSettingsService;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsRequestDto;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsResponseDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsRequestDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsResponseDto;
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
  public ResponseEntity<SchoolSmtpSettingsResponseDto> updateSmtpSettings(
      @AuthenticationPrincipal UserPrincipal principal,
      @RequestBody @Valid SchoolSmtpSettingsRequestDto schoolSmtpSettingsRequestDto) {
    val settings =
        schoolSettingsService.updateSmtpSettings(
            principal.schoolId(), schoolSmtpSettingsRequestDto);

    return ResponseEntity.ok(settings);
  }

  @GetMapping("/settings/smtp")
  public ResponseEntity<SchoolSmtpSettingsResponseDto> getSmtpSettings(
      @AuthenticationPrincipal UserPrincipal principal) {
    val settings = schoolSettingsService.getSmtpSettings(principal.schoolId());

    return ResponseEntity.ok(settings);
  }

  @PutMapping("/settings/payment")
  public ResponseEntity<SchoolPaymentSettingsResponseDto> updatePaymentSettings(
      @AuthenticationPrincipal UserPrincipal principal,
      @RequestBody @Valid SchoolPaymentSettingsRequestDto schoolPaymentSettingsRequestDto) {
    val settings =
        schoolSettingsService.updatePaymentSettings(
            principal.schoolId(), schoolPaymentSettingsRequestDto);

    return ResponseEntity.ok(settings);
  }

  @GetMapping("/settings/payment")
  public ResponseEntity<SchoolPaymentSettingsResponseDto> getPaymentSettings(
      @AuthenticationPrincipal UserPrincipal principal) {
    val settings = schoolSettingsService.getPaymentSettings(principal.schoolId());

    return ResponseEntity.ok(settings);
  }
}
