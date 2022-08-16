DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password CHAR(60) NOT NULL
);

DROP TABLE IF EXISTS habit;

CREATE TABLE habit (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(id),
    habit VARCHAR(50) NOT NULL,
    streak INT NOT NULL,
    frequency VARCHAR(20) NOT NULL,
    last_completed DATE
);

INSERT INTO user_account (username, password)
VALUES 
    ('ladybird', '$2a$12$5QAvn3Hp/949tnXHWg/zBuxmHkWaSUm0r9C6gooCUxdx4s9ZxTo1K'),
    ('lordbird', '$2a$12$5QAvn3Hp/949tnXHWg/zBuxmHkWaSUm0r9C6gooCUxdx4s9ZxTo1K');

INSERT INTO habit (user_id, habit, streak, frequency, last_completed)
VALUES
(1, 'sleep', 10, 'daily', '2022-08-15'),
(1, 'run', 10, 'daily', '2022-08-15'),
(1, 'eat', 10, 'daily', '2022-08-15'),
(2, 'sleep', 10, 'daily', '2022-08-15'),
(2, 'run', 10, 'daily', '2022-08-15');
