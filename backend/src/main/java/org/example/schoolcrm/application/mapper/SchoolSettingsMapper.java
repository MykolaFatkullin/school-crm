package org.example.schoolcrm.application.mapper;

import org.example.schoolcrm.infrastructure.persistence.entity.SchoolPaymentSettingsEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolSmtpSettingsEntity;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsRequestDto;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsResponseDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsRequestDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SchoolSettingsMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "smtpPassword", ignore = true)
  @Mapping(target = "school", ignore = true)
  void updateSchoolSmtpSettings(
      @MappingTarget SchoolSmtpSettingsEntity schoolSmtpSettingsEntity,
      SchoolSmtpSettingsRequestDto schoolSmtpSettingsRequestDto);

  @Mapping(
      target = "smtpPasswordConfigured",
      expression = "java(schoolSmtpSettingsEntity.getSmtpPassword() != null)")
  SchoolSmtpSettingsResponseDto smtpSettingsToDto(
      SchoolSmtpSettingsEntity schoolSmtpSettingsEntity);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "apiKey", ignore = true)
  @Mapping(target = "secretKey", ignore = true)
  @Mapping(target = "school", ignore = true)
  void updateSchoolPaymentSettings(
      @MappingTarget SchoolPaymentSettingsEntity schoolPaymentSettingsEntity,
      SchoolPaymentSettingsRequestDto schoolPaymentSettingsRequestDto);

  @Mapping(
      target = "apiKeyConfigured",
      expression = "java(schoolPaymentSettingsEntity.getApiKey() != null)")
  @Mapping(
      target = "secretKeyConfigured",
      expression = "java(schoolPaymentSettingsEntity.getSecretKey() != null)")
  SchoolPaymentSettingsResponseDto paymentSettingsToDto(
      SchoolPaymentSettingsEntity schoolPaymentSettingsEntity);
}
