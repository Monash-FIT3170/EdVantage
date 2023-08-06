-- DROP TABLES
DROP TABLE IF EXISTS class_enrolments CASCADE;
DROP TABLE IF EXISTS classes CASCADE;
DROP TABLE IF EXISTS units CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- CREATE TABLES
CREATE TABLE users
(
    user_id    SERIAL PRIMARY KEY,
    user_email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE units
(
    unit_code VARCHAR(50) PRIMARY KEY
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
-- Insert users
INSERT INTO users (user_email)
VALUES ('student1@example.com'),
       ('student2@example.com'),
       ('student3@example.com'),
       ('student4@example.com'),
       ('student5@example.com'),
       ('student6@example.com'),
       ('student7@example.com'),
       ('student8@example.com');

-- Insert units
INSERT INTO units (unit_code)
VALUES ('unit101'),
       ('unit102'),
       ('unit103'),
       ('unit104');

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