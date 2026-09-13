package org.example.schoolcrm.application.mapper;

import org.example.schoolcrm.infrastructure.persistence.entity.SchoolEntity;
import org.example.schoolcrm.web.dto.school.SchoolDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SchoolMapper {
  SchoolDto toSchoolDto(SchoolEntity schoolEntity);

  void updateSchoolEntity(@MappingTarget SchoolEntity schoolEntity, SchoolDto schoolDto);
}
