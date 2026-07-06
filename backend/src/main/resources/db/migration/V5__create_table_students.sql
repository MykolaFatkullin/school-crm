CREATE TABLE students
(
    user_id  UUID PRIMARY KEY REFERENCES school_users (id),
    class_id UUID REFERENCES school_classes (id)
)