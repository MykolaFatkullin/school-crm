CREATE TABLE assignments
(
    id          UUID PRIMARY KEY,
    teacher_id  UUID      NOT NULL REFERENCES teachers (user_id),
    lesson_id   UUID      NOT NULL REFERENCES lessons (id),
    title       VARCHAR(250)      NOT NULL,
    description TEXT,
    due_date    TIMESTAMP NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)