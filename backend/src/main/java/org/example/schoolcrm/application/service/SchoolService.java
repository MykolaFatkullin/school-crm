package org.example.schoolcrm.application.service;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.SchoolMapper;
import org.example.schoolcrm.common.exception.not_found.SchoolNotFoundByUserException;
import org.example.schoolcrm.common.exception.not_found.SchoolNotFoundException;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.SchoolRepository;
import org.example.schoolcrm.web.dto.school.SchoolDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SchoolService {

  private final SchoolRepository schoolRepository;

  private final SchoolMapper schoolMapper;

  @Transactional
  public SchoolEntity createSchool(String schoolName, String timeZone) {
    val schoolEntity = SchoolEntity.builder().name(schoolName).timezone(timeZone).build();

    return schoolRepository.save(schoolEntity);
  }

  public SchoolEntity findById(UUID id) {
    return schoolRepository.findById(id).orElseThrow(() -> new SchoolNotFoundException(id));
  }

  public SchoolDto findByUserId(UUID userId) {
    return schoolRepository
        .findByUserId(userId)
        .map(schoolMapper::toSchoolDto)
        .orElseThrow(() -> new SchoolNotFoundByUserException(userId));
  }

  @Transactional
  public SchoolDto updateSchoolInfo(SchoolDto schoolDto, UUID userId) {
    val storedSchool =
        schoolRepository
            .findByUserId(userId)
            .orElseThrow(() -> new SchoolNotFoundByUserException(userId));

    schoolMapper.updateSchoolEntity(storedSchool, schoolDto);

    val updated = schoolRepository.save(storedSchool);

    return schoolMapper.toSchoolDto(updated);
  }
}
