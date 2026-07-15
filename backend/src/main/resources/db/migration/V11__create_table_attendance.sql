CREATE TABLE attendance
(
    id                UUID PRIMARY KEY,
    lesson_id         UUID        NOT NULL REFERENCES lessons (id),
    student_id        UUID        NOT NULL REFERENCES students (user_id),
    attendance_status VARCHAR(50) NOT NULL,
    CONSTRAINT uniq_attendance UNIQUE (lesson_id, student_id),
    CONSTRAINT attendance_status_check CHECK (attendance_status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')),
);
