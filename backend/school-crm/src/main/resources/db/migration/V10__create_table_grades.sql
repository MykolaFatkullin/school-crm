CREATE TABLE grades
(
    id         UUID PRIMARY KEY,
    student_id UUID        NOT NULL REFERENCES students (user_id),
    teacher_id UUID        NOT NULL REFERENCES teachers (user_id),
    subject_id UUID        NOT NULL REFERENCES subjects (id),
    lesson_id  UUID        NOT NULL REFERENCES lessons (id),
    grade      SMALLINT    NOT NULL,
    type       VARCHAR(50) NOT NULL,
    UNIQUE (student_id, subject_id, lesson_id)
);
