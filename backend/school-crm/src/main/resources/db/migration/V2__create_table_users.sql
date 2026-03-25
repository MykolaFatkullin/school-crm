CREATE TABLE school_users
(
    id         UUID PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    gender     VARCHAR(10)  NOT NULL,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NOT NULL,
    role       VARCHAR(20)  NOT NULL,
    birth_date DATE         NOT NULL,
    school_id  UUID REFERENCES schools (id),

    CONSTRAINT check_role CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT', 'PARENT'))
);