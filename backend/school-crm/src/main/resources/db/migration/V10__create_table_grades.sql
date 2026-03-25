CREATE TABLE grades
(
    id         UUID PRIMARY KEY,
    student_id UUID        NOT NULL REFERENCES students (user_id),
    lesson_id  UUID        NOT NULL REFERENCES lessons (id),
    grade      SMALLINT    NOT NULL,
    type       VARCHAR(50) NOT NULL,
    CONSTRAINT uniq_grade UNIQUE (student_id, lesson_id),
    CONSTRAINT check_grade_range CHECK (grade >= 1 AND grade <= 12)
);
