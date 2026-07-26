package org.example.schoolcrm.infrastructure.persistence.repository;

import java.util.UUID;
import org.example.schoolcrm.infrastructure.persistence.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, UUID> {}
