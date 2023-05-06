CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
);

CREATE TABLE quiz_questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES quizzes(quiz_id),
    question TEXT NOT NULL,
    question_type TEXT NOT NULL
);

CREATE TABLE quiz_answers (
    answer_id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES quiz_questions(question_id),
    answer TEXT NOT NULL
);

CREATE TABLE quiz_options (
    option_id SERIAL PRIMARY KEY,
    question_ID INTEGER NOT NULL REFERENCES quiz_questions(question_id),
    option TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL
);

INSERT INTO quizzes (title, description)
VALUES ('Math Quiz', 'A quiz about basic arithmetic.');

INSERT INTO quiz_questions (quiz_id, question, question_type)
VALUES (1, 'What is 2 + 2?', 'multiple_choice');

INSERT INTO quiz_answers (question_id, answer)
VALUES (1, '4');

INSERT INTO quiz_options (question_id, option, is_correct)
VALUES (1, '2', false);

INSERT INTO quiz_options (question_id, option, is_correct)
VALUES (1, '3', false);

INSERT INTO quiz_options (question_id, option, is_correct)
VALUES (1, '4', true);

INSERT INTO quiz_questions (quiz_id, question, question_type)
VALUES (1, 'What is 4 + 4?', 'short_answer');

INSERT INTO quiz_answers (question_id, answer)
VALUES (2, '8');
