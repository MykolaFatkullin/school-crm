package org.example.schoolcrm.infrastructure.persistence.repository;

import org.example.schoolcrm.infrastructure.persistence.entity.AssignmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AssignmentRepository extends JpaRepository<AssignmentEntity, UUID> {
}
