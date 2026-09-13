CREATE TABLE school_payment_settings
(
    id                       UUID PRIMARY KEY,
    api_key                  VARCHAR(512),
    secret_key               VARCHAR(512),
    currency                 VARCHAR(255)  NOT NULL,
    tax_rate_percentage      DECIMAL(5, 2) NOT NULL,
    invoice_prefix           VARCHAR(255)  NOT NULL,
    default_payment_due_days INTEGER       NOT NULL,
    school_id                UUID          NOT NULL UNIQUE references schools (id)
)