CREATE TABLE IF NOT EXISTS Authors (
    id int,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255)
);

INSERT INTO
    Authors (id, first_name, last_name, email)
VALUES
    (1, 'Harry', 'Potter', 'HP1@gmail.com'),
    (2, 'Ron', 'Weasley', 'RW2@gmail.com'),
    (3, 'Hermione', 'Granger', 'HG3@gmail.com');
