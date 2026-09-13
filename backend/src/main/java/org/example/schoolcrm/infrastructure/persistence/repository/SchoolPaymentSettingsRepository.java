package org.example.schoolcrm.infrastructure.persistence.repository;

import java.util.Optional;
import java.util.UUID;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolPaymentSettingsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolPaymentSettingsRepository
    extends JpaRepository<SchoolPaymentSettingsEntity, UUID> {

  @Query(
      value =
          """
          SELECT settings
          FROM SchoolPaymentSettingsEntity settings
          JOIN settings.school school
          WHERE school.id = :schoolId
      """)
  Optional<SchoolPaymentSettingsEntity> findBySchoolId(@Param("schoolId") UUID schoolId);
}
