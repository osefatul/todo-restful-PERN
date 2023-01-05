CREATE DATABASE todo_database;


-- Get into todo_database
\c tod0_database;



CREATE TABLE todo (
    -- SERIAL MEAN: INCREMETED BY 1
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

-- Show all tables
\dt


-- select all data from todo table:
SELECT * FROM todo;

-- 