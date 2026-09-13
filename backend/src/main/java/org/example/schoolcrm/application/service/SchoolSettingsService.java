package org.example.schoolcrm.application.service;

import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.example.schoolcrm.application.mapper.SchoolSettingsMapper;
import org.example.schoolcrm.application.service.security.AesEncryptionService;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolPaymentSettingsEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolSmtpSettingsEntity;
import org.example.schoolcrm.infrastructure.persistence.repository.SchoolPaymentSettingsRepository;
import org.example.schoolcrm.infrastructure.persistence.repository.SchoolSmtpSettingsRepository;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsDto;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SchoolSettingsService {

  private final SchoolSmtpSettingsRepository schoolSmtpSettingsRepository;
  private final SchoolPaymentSettingsRepository schoolPaymentSettingsRepository;
  private final SchoolSettingsMapper schoolSettingsMapper;
  private final AesEncryptionService aesEncryptionService;

  public SchoolSmtpSettingsDto updateSmtpSettings(
      UUID schoolId, SchoolSmtpSettingsDto schoolSmtpSettingsDto) {
    val storedEntity =
        schoolSmtpSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolSmtpSettingsEntity::new);

    schoolSettingsMapper.updateSchoolSmtpSettings(storedEntity, schoolSmtpSettingsDto);

    val storedSmtpPassword = storedEntity.getSmtpPassword();
    storedEntity.setSmtpPassword(
        encryptIfChanged(storedSmtpPassword, schoolSmtpSettingsDto.smtpPassword()));

    val updatedEntity = schoolSmtpSettingsRepository.save(storedEntity);

    return schoolSettingsMapper.smtpSettingsToDto(updatedEntity);
  }

  public SchoolSmtpSettingsDto getSmtpSettings(UUID schoolId) {
    val storedSmtpSettings =
        schoolSmtpSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolSmtpSettingsEntity::new);

    return schoolSettingsMapper.smtpSettingsToDto(storedSmtpSettings);
  }

  public SchoolPaymentSettingsDto updatePaymentSettings(
      UUID schoolId, SchoolPaymentSettingsDto schoolSmtpSettingsDto) {
    val storedPaymentSettings =
        schoolPaymentSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolPaymentSettingsEntity::new);

    schoolSettingsMapper.updateSchoolPaymentSettings(storedPaymentSettings, schoolSmtpSettingsDto);

    val storedApiKey = storedPaymentSettings.getApiKey();
    val storedSecretKey = storedPaymentSettings.getSecretKey();

    storedPaymentSettings.setApiKey(encryptIfChanged(storedApiKey, schoolSmtpSettingsDto.apiKey()));
    storedPaymentSettings.setSecretKey(
        encryptIfChanged(storedSecretKey, schoolSmtpSettingsDto.secretKey()));

    val updatedEntity = schoolPaymentSettingsRepository.save(storedPaymentSettings);

    return schoolSettingsMapper.paymentSettingsToDto(updatedEntity);
  }

  public SchoolPaymentSettingsDto getPaymentSettings(UUID schoolId) {
    val storedPaymentSettings =
        schoolPaymentSettingsRepository
            .findBySchoolId(schoolId)
            .orElseGet(SchoolPaymentSettingsEntity::new);

    return schoolSettingsMapper.paymentSettingsToDto(storedPaymentSettings);
  }

  private String encryptIfChanged(String storedValue, String newValue) {
    if (Objects.equals(storedValue, newValue)) {
      return storedValue;
    }

    if (newValue == null) {
      return storedValue;
    }

    return aesEncryptionService.encrypt(newValue);
  }
}
