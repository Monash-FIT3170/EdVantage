-- DROP TABLES
DROP TABLE IF EXISTS class_enrolments CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS units CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- CREATE TABLES
CREATE TABLE roles
(
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users
(
    user_id    SERIAL PRIMARY KEY,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_name  VARCHAR(50), -- Full name of user
    role_id    INTEGER NOT NULL DEFAULT 1, -- Default to 1, which is student
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE units
(
    unit_code VARCHAR(50) PRIMARY KEY
);

CREATE TABLE unit_enrollment
(
    enrollment_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    unit_code VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (unit_code) REFERENCES units (unit_code)
);

CREATE TABLE classes
(
    class_num INTEGER     NOT NULL,
    unit_code VARCHAR(50) NOT NULL,
    PRIMARY KEY (class_num, unit_code),
    FOREIGN KEY (unit_code) REFERENCES units (unit_code)
);

CREATE TABLE class_enrolments
(
    user_id   INTEGER     NOT NULL,
    class_num INTEGER     NOT NULL,
    unit_code VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, unit_code),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (class_num, unit_code) REFERENCES classes (class_num, unit_code)
);


-- INSERT DATA
-- Insert roles
INSERT INTO roles (role_name)
VALUES ('student'),
       ('teacher'),
       ('admin');

-- Insert users with role_id
INSERT INTO users (user_email, user_name, role_id)
VALUES ('student1@example.com', 'Student 1', 1),
       ('student2@example.com', 'Student 2', 1),
       ('student3@example.com', 'Student 3', 1),
       ('student4@example.com', 'Student 4', 1),
       ('student5@example.com', 'Student 5', 1),
       ('student6@example.com', 'Student 6', 1),
       ('student7@example.com', 'Student 7', 1),
       ('student8@example.com', 'Student 8', 1),
       ('teacher1@example.com', 'Teacher 1', 2),
       ('admin1@example.com', 'Admin 1', 3);

-- Insert units
INSERT INTO units (unit_code)
VALUES ('unit101'),
       ('unit102'),
       ('unit103'),
       ('unit104');

-- Insert unit enrollments
INSERT INTO unit_enrollment(user_id, unit_code)
VALUES (1, 'unit101'),
       (2, 'unit101'),
       (3, 'unit101'),
       (4, 'unit101'),
       (5, 'unit101'),
       (6, 'unit101'),
       (7, 'unit101'),
       (8, 'unit101'),
       (9, 'unit101'),
       (1, 'unit102'),
       (2, 'unit102'),
       (3, 'unit102'),
       (4, 'unit102'),
       (5, 'unit102'),
       (6, 'unit102'),
       (7, 'unit102'),
       (8, 'unit102'),
       (9, 'unit102');

-- Insert classes
INSERT INTO classes (class_num, unit_code)
VALUES (1, 'unit101'),
       (2, 'unit101'),
       (3, 'unit102'),
       (4, 'unit102'),
       (1, 'unit103'),
       (2, 'unit103'),
       (3, 'unit104'),
       (4, 'unit104');

-- Insert class_enrolments
INSERT INTO class_enrolments (user_id, class_num, unit_code)
VALUES (1, 1, 'unit101'),
       (1, 3, 'unit102'),
       (2, 2, 'unit101'),
       (3, 1, 'unit101'),
       (4, 4, 'unit102'),
       (5, 1, 'unit103'),
       (5, 3, 'unit104'),
       (6, 2, 'unit103'),
       (7, 1, 'unit103'),
       (8, 4, 'unit104');