package org.example.schoolcrm.infrastructure.persistence.repository;

import org.example.schoolcrm.infrastructure.persistence.entity.SchoolEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SchoolRepository extends JpaRepository<SchoolEntity, UUID> {
}
