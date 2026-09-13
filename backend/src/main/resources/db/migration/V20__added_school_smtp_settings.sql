CREATE TABLE IF NOT EXISTS school_smtp_settings
(
    id            UUID PRIMARY KEY,
    smtp_host     VARCHAR(255) NOT NULL,
    smtp_port     INTEGER      NOT NULL,
    smtp_username VARCHAR(255) NOT NULL,
    smtp_password VARCHAR(255) NOT NULL,
    encryption    VARCHAR(255) NOT NULL,
    from_email    VARCHAR(255) NOT NULL,
    from_name     VARCHAR(255) NOT NULL,
    school_id     UUID         NOT NULL UNIQUE references schools (id)
)