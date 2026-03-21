CREATE TABLE assignments
(
    id          UUID PRIMARY KEY,
    class_id    UUID      NOT NULL REFERENCES school_classes (id),
    subject_id  UUID      NOT NULL REFERENCES subjects (id),
    teacher_id  UUID      NOT NULL REFERENCES teachers (user_id),
    title       TEXT      NOT NULL,
    description TEXT,
    due_date    DATE      NOT NULL,
    created_at  TIMESTAMP NOT NULL
)