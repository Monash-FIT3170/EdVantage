CREATE TABLE IF NOT EXISTS Authors (
    "ID" int,
    "First Name" varchar(255),
    "Last Name" varchar(255),
    "Email" varchar(255)
);

INSERT INTO
    Authors ("ID", "First Name", "Last Name", "Email")
VALUES
    (1, 'Harry', 'Potter', 'HP1@gmail.com'),
    (2, 'Ron', 'Weasley', 'RW2@gmail.com'),
    (3, 'Hermione', 'Granger', 'HG3@gmail.com');
