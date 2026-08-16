package org.example.schoolcrm.application.mapper;

import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.web.dto.registration.UserRegistrationDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "role", ignore = true)
  @Mapping(target = "school", ignore = true)
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "activated", constant = "false")
  UserEntity registerUser(UserRegistrationDto registrationDto);
}
