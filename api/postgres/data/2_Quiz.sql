-- DROP TABLES
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS question_answers CASCADE;
DROP TABLE IF EXISTS question_choices CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS question_results CASCADE;

-- CREATE TABLES
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    unit_code VARCHAR(50) NOT NULL,
    FOREIGN KEY (unit_code) REFERENCES units (unit_code)
);

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    question_type TEXT NOT NULL
);

CREATE TABLE quiz_questions (
    quiz_id INTEGER NOT NULL REFERENCES quizzes(quiz_id),
    question_id INTEGER NOT NULL REFERENCES questions(question_id)
);

CREATE TABLE question_answers (
    answer_id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(question_id),
    answer TEXT NOT NULL
);

CREATE TABLE question_choices (
    option_id SERIAL PRIMARY KEY,
    question_ID INTEGER NOT NULL REFERENCES questions(question_id),
    option TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL
);

CREATE TABLE quiz_attempts (
    attempt_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL REFERENCES users(user_id),
    quiz_id INTEGER NOT NULL REFERENCES quizzes(quiz_id),
    percentage FLOAT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_results (
    result_id SERIAL PRIMARY KEY,
    attempt_id INTEGER NOT NULL REFERENCES quiz_attempts(attempt_id),
    question_id INTEGER NOT NULL REFERENCES questions(question_id),
    user_answer TEXT NOT NULL,
    result BOOLEAN
);

-- INSERT DATA
INSERT INTO
    quizzes (title, description, unit_code)
VALUES
    ('Math Quiz (Easy)', 'A quiz about basic arithmetic.', 'FIT3170'),
    ('Math Quiz (Hard)', 'A quiz about basic and challenging arithmetic.', 'FIT3077'),
    ('English Quiz', 'A quiz about the English language', 'FIT3159');

INSERT INTO
    questions (question, question_type)
VALUES
    ('What is 2 + 2?', 'multiple_choice'),
    ('What is 4 + 4?', 'short_answer'),
    ('What is the derivative of log(x) + 2log(x) - log(x^2)?', 'short_answer'),
    ('What is another word for "big"?', 'short_answer');

INSERT INTO
    question_choices (question_id, option, is_correct)
VALUES
    (1, '2', false), (1, '3', false), (1, '4', true);

INSERT INTO
    question_answers (question_id, answer)
VALUES
    (1, '4'),
    (2, '8'),
    (3, '1/(x * log(10))'),
    (4, 'Large'), (4, 'Huge'), (4, 'Massive');

INSERT INTO
    quiz_questions (quiz_id, question_id)
VALUES
    (1, 1), (1, 2),
    (2, 1), (2, 2), (2, 3),
    (3, 4);
