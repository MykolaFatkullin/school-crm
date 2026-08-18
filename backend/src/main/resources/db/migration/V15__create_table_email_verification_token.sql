CREATE TABLE email_verification_token
(
    token           UUID PRIMARY KEY,
    expiration_date TIMESTAMP NOT NULL,
    user_id         UUID      NOT NULL REFERENCES school_users (id)
);