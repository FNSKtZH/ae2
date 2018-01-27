--revoke all but select on tables in database ae from public;
revoke all on all tables in schema ae from public;
grant connect on database ae to public;
grant usage on schema ae to public;
grant select on all tables in schema ae to public;

-- anon can see all but change nothing
grant connect on database ae to anon;
grant usage on schema public, auth, ae, request to anon;
grant select on all tables in schema ae to anon;
grant select on table pg_authid to anon;
grant execute on function ae.login(text,text) to anon;
alter default privileges in schema ae
  grant select on tables to anon;
alter default privileges in schema ae
  grant select, usage on sequences to anon;

grant select on table pg_authid to anon;
grant execute on function ae.login(text,text) to anon;
grant execute on function auth.sign(json,text,text) to anon;
grant execute on function auth.user_role(text,text) to anon;
grant execute on function request.user_name() to anon;
grant execute on function request.jwt_claim(text) to anon;
grant execute on function request.env_var(text) to anon;

grant connect on database ae to org_admin;
grant all on schema ae to org_admin;
grant usage on schema public, auth to org_admin;
grant all on all tables in schema ae to org_admin;
grant all on all sequences in schema ae to org_admin;
grant all on all functions in schema ae to org_admin;
alter default privileges in schema ae
  grant all on tables to org_admin;
alter default privileges in schema ae
  grant all on sequences to org_admin;
alter default privileges in schema ae
  grant all on functions to org_admin;
grant org_admin to authenticator;

grant connect on database ae to org_writer;
grant all on schema ae to org_writer;
grant usage on schema public, auth to org_writer;
grant all on all tables in schema ae to org_writer;
grant all on all sequences in schema ae to org_writer;
grant all on all functions in schema ae to org_writer;
alter default privileges in schema ae
  grant all on tables to org_writer;
alter default privileges in schema ae
  grant all on sequences to org_writer;
alter default privileges in schema ae
  grant all on functions to org_writer;
grant org_writer to authenticator;


-- secure pass and role in ae.user:
revoke all on ae.user from public;
grant select (id, name, email) on ae.user to anon;
grant select (id, name, email) on ae.user to org_writer;
grant select (id, name, email) on ae.user to org_admin;