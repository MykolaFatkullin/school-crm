CREATE TABLE subjects
(
    id        UUID PRIMARY KEY NOT NULL,
    name      VARCHAR(255)     NOT NULL,
    school_id UUID             NOT NULL REFERENCES schools (id)
);
