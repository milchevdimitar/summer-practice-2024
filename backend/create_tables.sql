CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE topic (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    student_id INTEGER REFERENCES user(id),
    approved BOOLEAN DEFAULT FALSE,
    supervisor_id INTEGER REFERENCES user(id)
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    deadline TIMESTAMP NOT NULL,
    student_id INTEGER NOT NULL REFERENCES user(id)
);