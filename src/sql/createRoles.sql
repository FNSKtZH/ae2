-- permissions that allow anonymous users to create accounts
-- and attempt to log in
create role anon;

-- create authenticator who can turn in to other role
create role authenticator with login password 'secret' noinherit;
grant anon to authenticator;

-- org_admin can do anything
-- as far as row-level-security allows
-- (allows only permitted projects)
drop role if exists org_admin;
create role org_admin;


-- org_writer can do anything
-- as far as row-level-security allows
-- (allows only permitted projects)
drop role if exists org_writer;
create role org_writer;