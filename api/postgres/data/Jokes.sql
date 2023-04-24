CREATE TABLE IF NOT EXISTS Jokes (
     id int,
     setup varchar(255),
     punchline varchar(255)
);

INSERT INTO
    Jokes (id, setup, punchline)
VALUES
    (1, 'Setup1', 'Punchline1'),
    (2, 'Setup2', 'Punchline2'),
    (3, 'Setup3', 'Punchline3');
