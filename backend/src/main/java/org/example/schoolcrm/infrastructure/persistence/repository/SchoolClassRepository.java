package org.example.schoolcrm.infrastructure.persistence.repository;

import org.example.schoolcrm.infrastructure.persistence.entity.SchoolClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClassEntity, UUID> {
}
