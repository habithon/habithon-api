INSERT INTO user_account (username, password)
VALUES (
    'ladybird', '$2a$12$5QAvn3Hp/949tnXHWg/zBuxmHkWaSUm0r9C6gooCUxdx4s9ZxTo1K'
);

INSERT INTO habit (user_id, habit, streak, frequency, last_completed)
VALUES
(1, 'sleep', 10, 'daily', '2022-08-15'),
(1, 'run', 10, 'daily', '2022-08-15'),
(1, 'eat', 10, 'daily', '2022-08-15'),
(2, 'sleep', 10, 'daily', '2022-08-15'),
(2, 'run', 10, 'daily', '2022-08-15');
