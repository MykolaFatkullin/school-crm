CREATE TABLE teachers
(
    user_id          UUID PRIMARY KEY REFERENCES school_users (id),
    description      TEXT,
    experience_years INT,
    education        VARCHAR(255),
    specialization   VARCHAR(255),
    hired_at         DATE
);