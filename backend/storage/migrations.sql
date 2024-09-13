-- CREATE

CREATE TABLE IF NOT EXISTS classrooms (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  code VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS problem_sets (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  classroom_id VARCHAR NOT NULL,
  FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mc_questions (
  id VARCHAR PRIMARY KEY,
  problem_set_id VARCHAR NOT NULL,
  type VARCHAR DEFAULT 'multiple_choice',
  image VARCHAR, -- image prompt
  text VARCHAR, -- text prompt
  answer VARCHAR NOT NULL,
  choices VARCHAR NOT NULL, -- base64 encoded json array of string choices
  FOREIGN KEY (problem_set_id) REFERENCES problem_sets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS matching_questions (
  id VARCHAR PRIMARY KEY,
  problem_set_id VARCHAR NOT NULL,
  type VARCHAR DEFAULT 'matching',
  relations VARCHAR NOT NULL, -- base64 encoded json array of image -> text tuples
  FOREIGN KEY (problem_set_id) REFERENCES problem_sets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS word_questions (
  id VARCHAR PRIMARY KEY,
  problem_set_id VARCHAR NOT NULL,
  type VARCHAR DEFAULT 'word',
  image VARCHAR, -- image prompt
  text VARCHAR, -- text prompt
  answers VARCHAR NOT NULL, -- base64 encoded json array of string answers
  FOREIGN KEY (problem_set_id) REFERENCES problem_sets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fill_blank_questions (
  id VARCHAR PRIMARY KEY,
  problem_set_id VARCHAR NOT NULL,
  type VARCHAR DEFAULT 'fill_blank',
  text VARCHAR NOT NULL, -- text prompt
  blank_indices VARCHAR NOT NULL, -- base64 encoded json array of integers
  choices VARCHAR NOT NULL, -- base64 encoded json array of string choices
  FOREIGN KEY (problem_set_id) REFERENCES problem_sets(id) ON DELETE CASCADE
);

-- DROP

DROP TABLE IF EXISTS classrooms;
DROP TABLE IF EXISTS problem_sets;
DROP TABLE IF EXISTS mc_questions;
DROP TABLE IF EXISTS matching_questions;
DROP TABLE IF EXISTS word_questions;
DROP TABLE IF EXISTS fill_blank_questions;
