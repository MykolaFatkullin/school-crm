CREATE TABLE teachers
(
    user_id          UUID PRIMARY KEY REFERENCES school_users (id),
    description      TEXT,
    experience_years INT          NOT NULL,
    education        VARCHAR(255) NOT NULL,
    hired_at         DATE         NOT NULL
);