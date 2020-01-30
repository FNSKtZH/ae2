--CREATE DATABASE ae encoding 'UTF8';
CREATE DATABASE ae WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';
\c ae
create role anon;
create role authenticator with login password '${AUTHENTICATOR_PASSWORD}' noinherit;
create role org_admin;
create role org_writer;
create user fdw_user with encrypted password 'secret';

-- use an sql file instead of .sh script
-- using pg_restore in an .sh. script resultet in schema ae being already created and the restore then failing
-- to use a .backup file run: pg_restore ae.backup > ae.sql