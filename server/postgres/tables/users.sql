CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email TEXT UNIQUE NOT NULL,
    birthdate TIMESTAMP NOT NULL,
    profession VARCHAR(100)
);