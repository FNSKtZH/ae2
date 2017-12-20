CREATE DATABASE ae encoding 'UTF8';
CREATE SCHEMA IF NOT EXISTS ae;
-- We put things inside the auth schema to hide
-- them from public view. Certain public procs/views will
-- refer to helpers and tables inside.
CREATE SCHEMA IF NOT EXISTS auth;
CREATE EXTENSION if not exists "uuid-ossp";
create extension if not exists pgcrypto;
-- run this once with real secret
ALTER DATABASE ae SET "app.jwt_secret" TO 'secret';

-- stored procedure that returns the token
CREATE TYPE auth.jwt_token AS (
  token text,
  role text,
  username text
);
