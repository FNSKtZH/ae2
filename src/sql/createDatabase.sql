CREATE DATABASE ae encoding 'UTF8';
-- We put things inside the auth schema to hide
-- them from public view. Certain public procs/views will
-- refer to helpers and tables inside.
CREATE EXTENSION if not exists "uuid-ossp";
create extension if not exists "postgres_fdw";
create user fdw_user with encrypted password 'secret';
grant select on table ae.v_vermehrung_arten to fdw_user;
grant select on table ae.v_apflora_lr_delarze to fdw_user;
grant select on table ae.v_apflora_sisf2 to fdw_user;
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
