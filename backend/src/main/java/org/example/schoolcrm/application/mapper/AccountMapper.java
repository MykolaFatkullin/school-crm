package org.example.schoolcrm.application.mapper;

import org.example.schoolcrm.infrastructure.persistence.entity.UserEntity;
import org.example.schoolcrm.web.dto.account.AccountInfoResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AccountMapper {

  @Mapping(target = "schoolId", source = "school.id")
  AccountInfoResponse userToAccountInfoResponse(UserEntity userEntity);
}
