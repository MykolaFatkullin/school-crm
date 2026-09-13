package org.example.schoolcrm.application.service;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.SchoolSettingsMapper;
import org.example.schoolcrm.application.service.security.AesEncryptionService;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolPaymentSettingsEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolSmtpSettingsEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.SchoolPaymentSettingsRepository;
import org.example.schoolcrm.infrastructure.persistence.repository.SchoolSmtpSettingsRepository;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsRequestDto;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsResponseDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsRequestDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class SchoolSettingsService {

  private final SchoolSmtpSettingsRepository schoolSmtpSettingsRepository;
  private final SchoolPaymentSettingsRepository schoolPaymentSettingsRepository;
  private final SchoolService schoolService;
  private final SchoolSettingsMapper schoolSettingsMapper;
  private final AesEncryptionService aesEncryptionService;

  @Transactional
  public SchoolSmtpSettingsResponseDto updateSmtpSettings(
      UUID schoolId, SchoolSmtpSettingsRequestDto schoolSmtpSettingsRequestDto) {
    val storedEntity =
        schoolSmtpSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolSmtpSettingsEntity::new);

    if (storedEntity.getSchool() == null) {
      val school = schoolService.findById(schoolId);
      storedEntity.setSchool(school);
    }

    schoolSettingsMapper.updateSchoolSmtpSettings(storedEntity, schoolSmtpSettingsRequestDto);

    val storedSmtpPassword = storedEntity.getSmtpPassword();
    storedEntity.setSmtpPassword(
        encryptIfChanged(storedSmtpPassword, schoolSmtpSettingsRequestDto.smtpPassword()));

    val updatedEntity = schoolSmtpSettingsRepository.save(storedEntity);

    return schoolSettingsMapper.smtpSettingsToDto(updatedEntity);
  }

  public SchoolSmtpSettingsResponseDto getSmtpSettings(UUID schoolId) {
    val storedSmtpSettings =
        schoolSmtpSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolSmtpSettingsEntity::new);

    return schoolSettingsMapper.smtpSettingsToDto(storedSmtpSettings);
  }

  @Transactional
  public SchoolPaymentSettingsResponseDto updatePaymentSettings(
      UUID schoolId, SchoolPaymentSettingsRequestDto schoolPaymentSettingsRequestDto) {
    val storedPaymentSettings =
        schoolPaymentSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolPaymentSettingsEntity::new);

    if (storedPaymentSettings.getSchool() == null) {
      val school = schoolService.findById(schoolId);
      storedPaymentSettings.setSchool(school);
    }

    schoolSettingsMapper.updateSchoolPaymentSettings(
        storedPaymentSettings, schoolPaymentSettingsRequestDto);

    val storedApiKey = storedPaymentSettings.getApiKey();
    val storedSecretKey = storedPaymentSettings.getSecretKey();

    storedPaymentSettings.setApiKey(
        encryptIfChanged(storedApiKey, schoolPaymentSettingsRequestDto.apiKey()));
    storedPaymentSettings.setSecretKey(
        encryptIfChanged(storedSecretKey, schoolPaymentSettingsRequestDto.secretKey()));

    val updatedEntity = schoolPaymentSettingsRepository.save(storedPaymentSettings);

    return schoolSettingsMapper.paymentSettingsToDto(updatedEntity);
  }

  public SchoolPaymentSettingsResponseDto getPaymentSettings(UUID schoolId) {
    val storedPaymentSettings =
        schoolPaymentSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolPaymentSettingsEntity::new);

    return schoolSettingsMapper.paymentSettingsToDto(storedPaymentSettings);
  }

  private String encryptIfChanged(String storedValue, String newValue) {
    if (newValue == null || newValue.isBlank()) {
      return storedValue;
    }

    return aesEncryptionService.encrypt(newValue);
  }
}
