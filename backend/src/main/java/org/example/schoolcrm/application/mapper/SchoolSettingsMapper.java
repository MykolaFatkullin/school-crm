package org.example.schoolcrm.application.mapper;

import org.example.schoolcrm.infrastructure.persistence.entity.SchoolPaymentSettingsEntity;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolSmtpSettingsEntity;
import org.example.schoolcrm.web.dto.school.SchoolPaymentSettingsDto;
import org.example.schoolcrm.web.dto.school.SchoolSmtpSettingsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SchoolSettingsMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "smtpPassword", ignore = true)
  void updateSchoolSmtpSettings(
      @MappingTarget SchoolSmtpSettingsEntity schoolSmtpSettingsEntity,
      SchoolSmtpSettingsDto schoolSmtpSettingsDto);

  @Mapping(target = "smtpPassword", constant = "******")
  SchoolSmtpSettingsDto smtpSettingsToDto(SchoolSmtpSettingsEntity schoolSmtpSettingsEntity);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "apiKey", ignore = true)
  @Mapping(target = "secretKey", ignore = true)
  void updateSchoolPaymentSettings(
      @MappingTarget SchoolPaymentSettingsEntity schoolSmtpSettingsEntity,
      SchoolPaymentSettingsDto schoolPaymentSettingsDto);

  @Mapping(target = "apiKey", constant = "******")
  @Mapping(target = "secretKey", constant = "******")
  SchoolPaymentSettingsDto paymentSettingsToDto(
      SchoolPaymentSettingsEntity schoolSmtpSettingsEntity);
}
