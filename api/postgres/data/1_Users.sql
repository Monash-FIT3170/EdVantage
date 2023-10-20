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
    user_id    VARCHAR(50) PRIMARY KEY, -- ID given from monash google account
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_name  VARCHAR(50), -- Full name of user
    role_id    INTEGER NOT NULL DEFAULT 1, -- Default to 1, which is student
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE units
(
    unit_code VARCHAR(50) PRIMARY KEY,
    unit_name VARCHAR(50),
    unit_moodle VARCHAR(50)
);

CREATE TABLE unit_enrollment
(
    enrollment_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
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
    user_id   VARCHAR(50) NOT NULL,
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

-- Insert users with role_id and fake Google-like IDs
INSERT INTO users (user_id, user_email, user_name, role_id)
VALUES
       ('123456789012345678901', 'student1@example.com', 'Student 1', 1),
       ('223456789012345678902', 'student2@example.com', 'Student 2', 1),
       ('323456789012345678903', 'student3@example.com', 'Student 3', 1),
       ('423456789012345678904', 'student4@example.com', 'Student 4', 1),
       ('523456789012345678905', 'student5@example.com', 'Student 5', 1),
       ('623456789012345678906', 'student6@example.com', 'Student 6', 1),
       ('723456789012345678907', 'student7@example.com', 'Student 7', 1),
       ('823456789012345678908', 'student8@example.com', 'Student 8', 1),
       ('923456789012345678909', 'teacher1@example.com', 'Teacher 1', 2),
       ('023456789012345678900', 'admin1@example.com', 'Admin 1', 3),
       ('105397968907776846762', 'sabd0011@student.monash.edu', 'Shareef Abdelal', 1),
       ('114320810043961729379', 'tthi0007@student.monash.edu', 'Thadisha Thilakaratne', 2);

-- Insert units
INSERT INTO units (unit_code, unit_name, unit_moodle)
VALUES ('FIT3170', 'Software Engineering Practice', 'https://lms.monash.edu/course/view.php?id=153821'),
       ('FIT3077', 'Architecture & Design', 'https://lms.monash.edu/course/view.php?id=155683'),
       ('FIT3159', 'Computer Architecture', 'https://lms.monash.edu/course/view.php?id=153817'),
       ('FIT3178', 'iOS App Development', 'https://lms.monash.edu/course/view.php?id=153826');

-- Insert unit enrollments
INSERT INTO unit_enrollment(user_id, unit_code)
VALUES ('123456789012345678901', 'FIT3170'),
       ('223456789012345678902', 'FIT3170'),
       ('323456789012345678903', 'FIT3170'),
       ('423456789012345678904', 'FIT3170'),
       ('523456789012345678905', 'FIT3170'),
       ('623456789012345678906', 'FIT3170'),
       ('723456789012345678907', 'FIT3170'),
       ('823456789012345678908', 'FIT3170'),
       ('923456789012345678909', 'FIT3170'),
       ('123456789012345678901', 'FIT3077'),
       ('223456789012345678902', 'FIT3077'),
       ('323456789012345678903', 'FIT3077'),
       ('423456789012345678904', 'FIT3077'),
       ('523456789012345678905', 'FIT3077'),
       ('623456789012345678906', 'FIT3077'),
       ('723456789012345678907', 'FIT3077'),
       ('823456789012345678908', 'FIT3159'),
       ('923456789012345678909', 'FIT3077'),
       ('105397968907776846762', 'FIT3170'),
       ('105397968907776846762', 'FIT3077'),
       ('105397968907776846762', 'FIT3159'),
       ('114320810043961729379', 'FIT3170'),
       ('114320810043961729379', 'FIT3077'),
       ('114320810043961729379', 'FIT3159');


-- Insert classes
INSERT INTO classes (class_num, unit_code)
VALUES (1, 'FIT3170'),
       (2, 'FIT3170'),
       (3, 'FIT3077'),
       (4, 'FIT3077'),
       (1, 'FIT3159'),
       (2, 'FIT3159'),
       (3, 'FIT3178'),
       (4, 'FIT3178');

-- Insert class_enrolments
INSERT INTO class_enrolments (user_id, class_num, unit_code)
VALUES ('123456789012345678901', 1, 'FIT3170'),
       ('123456789012345678901', 3, 'FIT3077'),
       ('223456789012345678902', 2, 'FIT3170'),
       ('323456789012345678903', 1, 'FIT3170'),
       ('423456789012345678904', 4, 'FIT3077'),
       ('523456789012345678905', 1, 'FIT3159'),
       ('523456789012345678905', 3, 'FIT3178'),
       ('623456789012345678906', 2, 'FIT3159'),
       ('723456789012345678907', 1, 'FIT3159'),
       ('823456789012345678908', 4, 'FIT3178');