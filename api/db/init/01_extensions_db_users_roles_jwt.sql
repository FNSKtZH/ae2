-- nope, do not create database ae: will be done by restore?
--CREATE DATABASE ae encoding 'UTF8';
-- create ae only if not yet exists
-- see: https://stackoverflow.com/a/18389184/712005
-- BUT: it is not necessary to create db ae because was created by postgres because env variable POSTGRES_DB=ae
--SELECT 'CREATE DATABASE ae' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ae')\gexec
CREATE EXTENSION if not exists "uuid-ossp";
create extension if not exists postgres_fdw;
create extension if not exists pgcrypto;
create role anon;
create role authenticator with login password '${AUTHENTICATOR_PASSWORD}' noinherit;
create role org_admin;
create role org_writer;