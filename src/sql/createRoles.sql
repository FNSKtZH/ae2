-- permissions that allow anonymous users to create accounts
-- and attempt to log in
create role anon;
create role authenticator with login password 'secret' noinherit;
grant anon to authenticator;
grant connect on database ae to authenticator;
grant connect on database ae to anon;

grant usage on schema public, auth, ae, request to anon;
grant select on table pg_authid, auth.user to anon;
grant execute on function ae.login(text,text) to anon;
grant execute on function auth.sign(json,text,text) to anon;
grant execute on function auth.user_role(text,text) to anon;
grant execute on function request.user_name() to anon;
grant execute on function request.jwt_claim(text) to anon;
grant execute on function request.env_var(text) to anon;

--revoke connect on database ae from public;
revoke all on all tables in schema ae from public;

grant connect on database ae to public;
grant usage on schema ae to public;
grant select on all tables in schema ae to public;

-- anon can see all but change nothing
grant connect on database ae to anon;
grant usage on schema public, auth, ae to anon;
grant select on all tables in schema ae to anon;
grant select on table pg_authid, auth.user to anon;
grant execute on function ae.login(text,text) to anon;
alter default privileges in schema ae
  grant select on tables to anon;
alter default privileges in schema ae
  grant select, usage on sequences to anon;
grant anon to authenticator;

-- org_admin can do anything
-- as far as row-level-security allows
-- (allows only permitted projects)
drop role if exists org_admin;
create role org_admin;
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

-- org_collection_writer can do anything
-- as far as row-level-security allows
-- (allows only permitted projects)
drop role if exists org_collection_writer;
create role org_collection_writer;
grant connect on database ae to org_collection_writer;
grant all on schema ae to org_collection_writer;
grant usage on schema public, auth to org_collection_writer;
grant all on all tables in schema ae to org_collection_writer;
grant all on all sequences in schema ae to org_collection_writer;
grant all on all functions in schema ae to org_collection_writer;
alter default privileges in schema ae
  grant all on tables to org_collection_writer;
alter default privileges in schema ae
  grant all on sequences to org_collection_writer;
alter default privileges in schema ae
  grant all on functions to org_collection_writer;
grant org_collection_writer to authenticator;

-- org_habitat_writer can do anything
-- as far as row-level-security allows
-- (allows only permitted projects)
drop role if exists org_habitat_writer;
create role org_habitat_writer;
grant connect on database ae to org_habitat_writer;
grant all on schema ae to org_habitat_writer;
grant usage on schema public, auth to org_habitat_writer;
grant all on all tables in schema ae to org_habitat_writer;
grant all on all sequences in schema ae to org_habitat_writer;
grant all on all functions in schema ae to org_habitat_writer;
alter default privileges in schema ae
  grant all on tables to org_habitat_writer;
alter default privileges in schema ae
  grant all on sequences to org_habitat_writer;
alter default privileges in schema ae
  grant all on functions to org_habitat_writer;
grant org_habitat_writer to authenticator;

-- org_taxonomy_writer can do anything
-- as far as row-level-security allows
-- (allows only permitted projects)
drop role if exists org_taxonomy_writer;
create role org_taxonomy_writer;
grant connect on database ae to org_taxonomy_writer;
grant all on schema ae to org_taxonomy_writer;
grant usage on schema public, auth to org_taxonomy_writer;
grant all on all tables in schema ae to org_taxonomy_writer;
grant all on all sequences in schema ae to org_taxonomy_writer;
grant all on all functions in schema ae to org_taxonomy_writer;
alter default privileges in schema ae
  grant all on tables to org_taxonomy_writer;
alter default privileges in schema ae
  grant all on sequences to org_taxonomy_writer;
alter default privileges in schema ae
  grant all on functions to org_taxonomy_writer;
grant org_taxonomy_writer to authenticator;