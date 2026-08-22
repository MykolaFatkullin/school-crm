CREATE TABLE refresh_tokens
(
    id         UUID PRIMARY KEY,
    user_id    UUID         NOT NULL REFERENCES school_users (id),
    token      UUID NOT NULL UNIQUE,
    expires_at TIMESTAMP    NOT NULL
)