CREATE TABLE teacher_subjects
(
    teacher_id UUID REFERENCES teachers (user_id),
    subject_id UUID REFERENCES subjects (id),
    PRIMARY KEY (teacher_id, subject_id)
);