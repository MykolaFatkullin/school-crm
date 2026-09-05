package org.example.schoolcrm.application.mapper;

import org.example.schoolcrm.infrastructure.persistence.entity.NotificationsEntity;
import org.example.schoolcrm.web.dto.notifications.NotificationsDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface NotificationsMapper {

  NotificationsDto toDto(NotificationsEntity notificationsEntity);
}
