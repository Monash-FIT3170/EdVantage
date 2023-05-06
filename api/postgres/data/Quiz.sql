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

INSERT INTO quizzes (title, description)
VALUES ('Math Quiz', 'A quiz about basic arithmetic.');

INSERT INTO questions (question, question_type)
VALUES ('What is 2 + 2?', 'multiple_choice');

INSERT INTO question_choices (question_id, option, is_correct)
VALUES (1, '2', false);

INSERT INTO question_choices (question_id, option, is_correct)
VALUES (1, '3', false);

INSERT INTO question_choices (question_id, option, is_correct)
VALUES (1, '4', true);

INSERT INTO questions (question, question_type)
VALUES ('What is 4 + 4?', 'short_answer');

INSERT INTO question_answers (question_id, answer)
VALUES (2, '8');

INSERT INTO quiz_questions (quiz_id, question_id)
VALUES (1, 1), (1, 2);