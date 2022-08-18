DROP TABLE IF EXISTS habit;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password CHAR(60) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(50) 
);

CREATE TABLE habit (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(id),
    image_url VARCHAR(100),
    habit VARCHAR(50) NOT NULL,
    streak INT DEFAULT 0,
    frequency VARCHAR(20) NOT NULL,
    last_completed TIMESTAMPTZ
);


INSERT INTO user_account (username, password)
VALUES 
    ('ladybird', '$2a$12$5QAvn3Hp/949tnXHWg/zBuxmHkWaSUm0r9C6gooCUxdx4s9ZxTo1K'),
    ('lordbird', '$2a$12$5QAvn3Hp/949tnXHWg/zBuxmHkWaSUm0r9C6gooCUxdx4s9ZxTo1K');

INSERT INTO habit (user_id, image_url, habit, streak, frequency, last_completed)
VALUES
(1, 'images/goals-water.jpg','water', 10, 'weekly', '2022-08-17'),
(1, 'images/goals-exercise.jpg','exercise', 10, 'daily', '2022-08-17'),
(1, 'images/goals-reading.jpg','read', 10, 'daily', '2022-08-15'),
(2, 'images/goals-sleep.jpg','sleep', 10, 'daily', '2022-08-15'),
(2, 'images/goals-exercise.jpg','exercise', 10, 'daily', '2022-08-15');
