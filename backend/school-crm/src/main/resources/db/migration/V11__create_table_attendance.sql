CREATE TABLE attendance
(
    id         UUID PRIMARY KEY,
    lesson_id  UUID    NOT NULL REFERENCES lessons (id),
    student_id UUID    NOT NULL REFERENCES students (user_id),
    is_present BOOLEAN NOT NULL,
    CONSTRAINT uniq_attendance UNIQUE (lesson_id, student_id)
);
