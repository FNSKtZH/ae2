-- function takes an user name, old password, new password, email
-- and updates this data if the credentials match a user in the internal table
-- and returns an updated token
create or replace function ae.edit_user(username text, pass text, pass_new text, email text)
returns auth.jwt_token
  as $$
declare
  _role name;
  _username text;
  _pass text;
  _email text;
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