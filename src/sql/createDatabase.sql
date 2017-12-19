CREATE DATABASE ae encoding 'UTF8';
CREATE SCHEMA IF NOT EXISTS ae;
-- We put things inside the auth schema to hide
-- them from public view. Certain public procs/views will
-- refer to helpers and tables inside.
CREATE SCHEMA IF NOT EXISTS auth;
CREATE EXTENSION "uuid-ossp";
CREATE EXTENSION pgcrypto;
-- run this once with real secret
ALTER DATABASE ae SET "app.jwt_secret" TO 'secret';
