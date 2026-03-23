CREATE TABLE school_classes
(
    id        UUID PRIMARY KEY,
    name      VARCHAR(50) NOT NULL,
    school_id UUID        NOT NULL
)