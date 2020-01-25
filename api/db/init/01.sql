CREATE DATABASE ae encoding 'UTF8';
CREATE EXTENSION if not exists "uuid-ossp";
create extension if not exists "postgres_fdw";
create extension if not exists pgcrypto;
create user fdw_user with encrypted password 'secret';
grant select on table ae.v_vermehrung_arten to fdw_user;
grant select on table ae.v_apflora_lr_delarze to fdw_user;
grant select on table ae.v_apflora_taxonomies to fdw_user;
create role anon;
create role authenticator with login password '${AUTHENTICATOR_PASSWORD}' noinherit;
create role org_admin;
create role org_writer;
pg_restore --host localhost --port 5432 --username postgres --no-password --dbname ae --verbose "/sik_data/ae.backup"
ALTER DATABASE ae SET "app.jwt_secret" TO '${JWT_SECRET}';