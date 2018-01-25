CREATE DATABASE ae encoding 'UTF8';
-- We put things inside the auth schema to hide
-- them from public view. Certain public procs/views will
-- refer to helpers and tables inside.
CREATE EXTENSION if not exists "uuid-ossp";
create extension if not exists pgcrypto;
create role anon;
create role authenticator with login password 'secret' noinherit;
create role org_admin;
create role org_writer;
-- restore from backup, then:
-- run this once with real secret
ALTER DATABASE ae SET "app.jwt_secret" TO 'secret';
ALTER USER "authenticator" WITH PASSWORD 'secret';

-- dont run these, they come with restoring ae:
CREATE SCHEMA IF NOT EXISTS ae;
CREATE SCHEMA IF NOT EXISTS auth;
-- once: alter TYPE auth.jwt_token add attribute exp integer;
