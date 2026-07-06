package org.example.schoolcrm.application.mapper;

import org.example.schoolcrm.infrastructure.persistence.entity.SchoolEntity;
import org.example.schoolcrm.web.dto.school.SchoolViewDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SchoolMapper {
    SchoolViewDto toSchoolViewDto(SchoolEntity schoolEntity);
}
