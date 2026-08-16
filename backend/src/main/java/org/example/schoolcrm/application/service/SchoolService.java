package org.example.schoolcrm.application.service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.SchoolMapper;
import org.example.schoolcrm.common.exception.not_found.SchoolNotFoundException;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.SchoolRepository;
import org.example.schoolcrm.web.dto.school.SchoolViewDto;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchoolService {

  private final SchoolRepository schoolRepository;

  private final SchoolMapper schoolMapper;

  @Transactional
  public SchoolEntity createSchool(String schoolName) {
    val schoolEntity = SchoolEntity.builder().name(schoolName).build();

    return schoolRepository.save(schoolEntity);
  }

  public SchoolEntity findById(UUID schoolId) {
    return schoolRepository
        .findById(schoolId)
        .orElseThrow(() -> new SchoolNotFoundException(schoolId));
  }

  public List<SchoolViewDto> findAll() {
    return schoolRepository.findAll().stream().map(schoolMapper::toSchoolViewDto).toList();
  }
}
