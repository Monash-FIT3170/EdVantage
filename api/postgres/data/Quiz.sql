CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
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

INSERT INTO
    quizzes (title, description)
VALUES
    ('Math Quiz (Easy)', 'A quiz about basic arithmetic.'),
    ('Math Quiz (Hard)', 'A quiz about basic and challenging arithmetic.'),
    ('English Quiz', 'A quiz about the English language');

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
    (1, '2', false), (1, '4', false), (1, '4', true);

INSERT INTO
    question_answers (question_id, answer)
VALUES
    (2, '8'),
    (3, '1/(x * log(10))'),
    (4, 'Large'), (4, 'Huge'), (4, 'Massive');

INSERT INTO
    quiz_questions (quiz_id, question_id)
VALUES
    (1, 1), (1, 2),
    (2, 1), (2, 2), (2, 3),
    (3, 4);
