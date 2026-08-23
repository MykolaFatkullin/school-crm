CREATE INDEX idx_evt_user_type ON email_verification_token (user_id, type);
CREATE INDEX idx_evt_expiration ON email_verification_token (expiration_date);
