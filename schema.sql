DROP DATABASE IF EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE TABLE departments(
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR (80),
    PRIMARY KEY(id)
);

/
CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(80),
    last_name VARCHAR(80),
    role VARCHAR(80),
    department VARCHAR(80),
    PRIMARY KEY(id)
)
/
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(80)
    PRIMARY KEY(id)
);


