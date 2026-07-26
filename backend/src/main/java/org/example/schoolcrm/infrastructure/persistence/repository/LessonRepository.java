package org.example.schoolcrm.infrastructure.persistence.repository;

import java.util.UUID;
import org.example.schoolcrm.infrastructure.persistence.entity.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity, UUID> {}
