CREATE TABLE IF NOT EXISTS notifications
(
    id         UUID PRIMARY KEY,
    type       varchar(50)  NOT NULL,
    message    varchar(255) NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    read       BOOLEAN      NOT NULL DEFAULT FALSE,
    user_id    UUID         NOT NULL references school_users (id)
)