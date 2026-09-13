package org.example.schoolcrm.web;

import static org.example.schoolcrm.common.Constants.SCHOOL_PREFIX;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.service.SchoolService;
import org.example.schoolcrm.infrastructure.security.UserPrincipal;
import org.example.schoolcrm.web.dto.school.SchoolDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(SCHOOL_PREFIX)
@RequiredArgsConstructor
public class SchoolController {

  private final SchoolService schoolService;

  @GetMapping
  public ResponseEntity<SchoolDto> getSchool(@AuthenticationPrincipal UserPrincipal principal) {
    val school = schoolService.findByUserId(principal.userId());

    return ResponseEntity.ok(school);
  }

  @PatchMapping
  public ResponseEntity<SchoolDto> updateSchool(
      @AuthenticationPrincipal UserPrincipal principal, SchoolDto schoolDto) {
    val updatedSchool = schoolService.updateSchoolInfo(schoolDto, principal.userId());

    return ResponseEntity.ok(updatedSchool);
  }
}
