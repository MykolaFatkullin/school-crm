package org.example.schoolcrm.infrastructure.persistence.repository;

import java.util.Optional;
import java.util.UUID;
import org.example.schoolcrm.infrastructure.persistence.entity.SchoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepository extends JpaRepository<SchoolEntity, UUID> {
  @Query(
      value =
          """
          SELECT u.school
          FROM UserEntity u
          WHERE u.id = :userId
      """)
  Optional<SchoolEntity> findByUserId(@Param("userId") UUID userId);
}
