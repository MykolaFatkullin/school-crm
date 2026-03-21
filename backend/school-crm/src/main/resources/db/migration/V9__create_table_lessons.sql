CREATE TABLE lessons
(
    id          UUID PRIMARY KEY,
    schedule_id UUID NOT NULL REFERENCES schedule (id),
    date        DATE NOT NULL,
    UNIQUE (schedule_id, date)
);
