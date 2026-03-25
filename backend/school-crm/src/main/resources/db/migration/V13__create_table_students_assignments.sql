CREATE TABLE student_assignments
(
    id            UUID PRIMARY KEY,
    assignment_id UUID        NOT NULL REFERENCES assignments (id),
    student_id    UUID        NOT NULL REFERENCES students (user_id),
    status        VARCHAR(50) NOT NULL,
    check_status  VARCHAR(50),
    CONSTRAINT uniq_student_assignment UNIQUE (assignment_id, student_id),
    CONSTRAINT status_check CHECK (status IN ('ASSIGNED', 'IN_PROGRESS', 'DONE')),
    CONSTRAINT check_status_check CHECK (check_status IS NULL OR check_status IN ('CORRECT', 'INCORRECT', 'NOT_DONE'))
)