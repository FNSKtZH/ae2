CREATE DATABASE ae encoding 'UTF8';
create role anon;
create role authenticator with login password '${AUTHENTICATOR_PASSWORD}' noinherit;
create role org_admin;
create role org_writer;
create user fdw_user with encrypted password 'secret';

-- use an sql file instead of .sh script
-- using pg_restore in an .sh. script resultet in schema ae being already created and the restore then failing
-- to use a .backup file run: pg_restore ae.backup > ae.sql