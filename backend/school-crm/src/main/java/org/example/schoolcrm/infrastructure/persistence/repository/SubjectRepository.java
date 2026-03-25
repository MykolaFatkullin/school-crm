package org.example.schoolcrm.infrastructure.persistence.repository;

import org.example.schoolcrm.infrastructure.persistence.entity.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectEntity, UUID> {
}
