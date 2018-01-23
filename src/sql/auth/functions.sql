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

drop trigger if exists ensure_user_role_exists on ae.user;
create constraint trigger ensure_user_role_exists
  after insert or update on ae.user
  for each row
  execute procedure auth.check_role_exists();

-- make sure ae.user is updated, when ae.user is
--drop function keep_ae_user_updated_on_update()
--drop trigger if exists keep_ae_user_updated_on_update on ae.user;

-- make sure ae.user is inserted, when ae.user is
--drop function keep_ae_user_updated_on_insert();
--drop trigger if exists keep_ae_user_updated_on_insert on ae.user;

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
-- to keep passwords safe in the user table
drop trigger if exists encrypt_pass on ae.user;
create trigger encrypt_pass
  before insert or update on ae.user
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
  select role from ae.user
   where ae.user.name = $1
     and ae.user.pass = crypt($2, ae.user.pass)
  );
end;
$$;

-- Login function which takes an user name and password
-- and returns JWT if the credentials match a user in the internal table
create or replace function ae.login(username text, pass text)
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
      select _role as role
      --$1 as username,
      --extract(epoch from now())::integer + 60*60*24*30 as exp
    ) r
    into result;
  return (result.token, _role, $1, extract(epoch from (now() + interval '1 week')))::auth.jwt_token;
end;
$$ language plpgsql;

create or replace function current_user_name() returns text as $$
  select nullif(current_setting('jwt.claims.username', true), '')::text;
$$ language sql stable security definer;
