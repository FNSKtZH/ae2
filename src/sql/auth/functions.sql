-- run this once
ALTER DATABASE apflora SET "app.jwt_secret" TO 'secret';

-- We put things inside the auth schema to hide
-- them from public view. Certain public procs/views will
-- refer to helpers and tables inside.
CREATE SCHEMA IF NOT EXISTS auth;

CREATE TABLE IF NOT EXISTS auth.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name varchar(30) NOT NULL UNIQUE,
  role name NOT NULL check (length(role) < 512),
  -- allow other attributes to be null
  -- so names and roles can be set beforehand by organization
  email text DEFAULT NULL UNIQUE check ( email ~* '^.+@.+\..+$' ),
  pass text NULL,
  CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

-- use a trigger to manually enforce the role being a foreign key to actual
-- database roles
create or replace function auth.check_role_exists() returns trigger
  language plpgsql
  as $$
begin
  if not exists (select 1 from pg_roles as r where r.rolname = new.role) then
    raise foreign_key_violation using message =
      'unknown database role: ' || new.role;
    return null;
  end if;
  return new;
end
$$;

drop trigger if exists ensure_user_role_exists on auth.users;
create constraint trigger ensure_user_role_exists
  after insert or update on auth.users
  for each row
  execute procedure auth.check_role_exists();

-- make sure ae.user is updated, when auth.user is
create or replace function keep_ae_user_updated_on_update() returns trigger as
$$
begin
  update ae.user
  set name = new.name, email = new.email
  where ae.user.id = new.id
end
$$
language plpgsql;
drop trigger if exists keep_ae_user_updated_on_update on auth.users;
create trigger keep_ae_user_updated_on_update AFTER UPDATE ON auth.users
  for each row execute procedure keep_ae_user_updated_on_update();

-- make sure ae.user is inserted, when auth.user is
create or replace function keep_ae_user_updated_on_insert() returns trigger as
$$
  begin
    INSERT INTO
      ae.user(id, name, email)
      VALUES(new.id, new.name, new.email);
    RETURN new;
  end;
$$
language plpgsql;
drop trigger if exists keep_ae_user_updated_on_insert on auth.users;
create trigger keep_ae_user_updated_on_insert after insert on auth.user
  for each row execute procedure keep_ae_user_updated_on_insert();

create extension if not exists pgcrypto;
-- this does not work on windows
-- need to run pgjwt.sql
--create extension if not exists pgjwt;

create or replace function auth.encrypt_pass() returns trigger as
$$
begin
  if tg_op = 'INSERT' or new.pass <> old.pass then
    new.pass = crypt(new.pass, gen_salt('bf'));
  end if;
  return new;
end
$$
language plpgsql;

-- We’ll use the pgcrypto extension and a trigger
-- to keep passwords safe in the users table
drop trigger if exists encrypt_pass on auth.users;
create trigger encrypt_pass
  before insert or update on auth.users
  for each row
  execute procedure auth.encrypt_pass();

-- Helper to check a password against the encrypted column
-- It returns the database role for a user
-- if the name and password are correct
create or replace function auth.user_role(username text, pass text)
returns name
  language plpgsql
  as $$
begin
  return (
  select role from auth.users
   where users.name = $1
     and users.pass = crypt($2, users.pass)
  );
end;
$$;

-- stored procedure that returns the token
CREATE TYPE auth.jwt_token AS (
  token text
);

-- Login function which takes an user name and password
-- and returns JWT if the credentials match a user in the internal table
--create type login_return as (token auth.jwt_token, role text);
create or replace function apflora.login(username text, pass text)
returns auth.jwt_token
  as $$
declare
  _role name;
  result auth.jwt_token;
begin
  -- check username and password
  select auth.user_role($1, $2) into _role;
  if _role is null then
    raise invalid_password using message = 'invalid user or password';
  end if;

  select auth.sign(
      row_to_json(r), current_setting('app.jwt_secret')
    ) as token
    from (
      select _role as role,
      $1 as username,
      extract(epoch from now())::integer + 60*60*24*30 as exp
    ) r
    into result;
  return result;
end;
$$ language plpgsql;

-- permissions that allow anonymous users to create accounts
-- and attempt to log in
create role anon;
create role authenticator with login password 'secret' noinherit;
grant anon to authenticator;
grant connect on database apflora to authenticator;
grant connect on database apflora to anon;

grant usage on schema public, auth, apflora, request to anon;
grant select on table pg_authid, auth.users to anon;
grant execute on function apflora.login(text,text) to anon;
grant execute on function auth.sign(json,text,text) to anon;
grant execute on function auth.user_role(text,text) to anon;
grant execute on function request.user_name() to anon;
grant execute on function request.jwt_claim(text) to anon;
grant execute on function request.env_var(text) to anon;
