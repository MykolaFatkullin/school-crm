CREATE TABLE schedule
(
    id          UUID PRIMARY KEY,
    teacher_id  UUID        NOT NULL REFERENCES teachers (user_id),
    class_id    UUID        NOT NULL REFERENCES school_classes (id),
    subject_id  UUID        NOT NULL REFERENCES subjects (id),
    day_of_week VARCHAR(20) NOT NULL,
    start_time  TIME        NOT NULL,
    end_time    TIME        NOT NULL,
    CONSTRAINT uniq_schedule UNIQUE (class_id, day_of_week, start_time),
    CONSTRAINT uniq_schedule_teacher UNIQUE (teacher_id, day_of_week, start_time),

    CONSTRAINT check_schedule_time CHECK (end_time > start_time)
)