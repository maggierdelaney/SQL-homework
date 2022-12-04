DROP DATABASE IF EXISTS hospital_db;
CREATE DATABASE hospital_db;

USE hospital_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(100) NOT NULL
  /*connect to other tables*/
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
    /*connect to other tables*/
  department VARCHAR(100) NOT NULL,
    /*connect to other tables*/
  salary INT NOT NULL,
    /*connect to other tables*/
  manager VARCHAR(100) NOT NULL,
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
    /*connect to other tables*/
  department VARCHAR(100) NOT NULL,
    /*connect to other tables*/
  salary INT NOT NULL,
    /*connect to other tables*/
);