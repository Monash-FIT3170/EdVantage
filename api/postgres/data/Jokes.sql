CREATE TABLE IF NOT EXISTS Jokes (
     ID int,
     Setup varchar(255),
     Punchline varchar(255)
);

INSERT INTO
    Jokes (ID, Setup, Punchline)
VALUES
    (1, 'Setup1', 'Punchline1'),
    (2, 'Setup2', 'Punchline2'),
    (3, 'Setup3', 'Punchline3');
