package org.example.schoolcrm.application.mapper;

import static org.example.schoolcrm.common.Constants.REPLACEMENT;

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
  @Mapping(target = "school", ignore = true)
  void updateSchoolSmtpSettings(
      @MappingTarget SchoolSmtpSettingsEntity schoolSmtpSettingsEntity,
      SchoolSmtpSettingsDto schoolSmtpSettingsDto);

  @Mapping(target = "smtpPassword", constant = REPLACEMENT)
  SchoolSmtpSettingsDto smtpSettingsToDto(SchoolSmtpSettingsEntity schoolSmtpSettingsEntity);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "apiKey", ignore = true)
  @Mapping(target = "secretKey", ignore = true)
  @Mapping(target = "school", ignore = true)
  void updateSchoolPaymentSettings(
      @MappingTarget SchoolPaymentSettingsEntity schoolPaymentSettingsEntity,
      SchoolPaymentSettingsDto schoolPaymentSettingsDto);

  @Mapping(target = "apiKey", constant = REPLACEMENT)
  @Mapping(target = "secretKey", constant = REPLACEMENT)
  SchoolPaymentSettingsDto paymentSettingsToDto(
      SchoolPaymentSettingsEntity schoolPaymentSettingsEntity);
}
