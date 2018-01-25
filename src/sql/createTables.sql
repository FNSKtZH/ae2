-- data_type is used for root nodes in app's tree
-- actually: is not used in app, values are directly set :-(
DROP TABLE IF EXISTS ae.data_type CASCADE;
CREATE TABLE ae.data_type (
  name text PRIMARY KEY
);
INSERT INTO ae.data_type VALUES ('Taxonomien'), ('Eigenschaften-Sammlungen');
ALTER TABLE ae.data_type ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.data_type;
CREATE POLICY writer ON ae.data_type
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );

DROP TABLE IF EXISTS ae.category CASCADE;
CREATE TABLE ae.category (
  name text PRIMARY KEY,
  -- data_type is used to attach categories to root node in app's tree
  data_type text DEFAULT 'Taxonomien' REFERENCES ae.data_type (name) ON DELETE SET NULL ON UPDATE CASCADE,
  id UUID DEFAULT uuid_generate_v1mc()
);
ALTER TABLE ae.category ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.category;
CREATE POLICY writer ON ae.category
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );

DROP TABLE IF EXISTS ae.organization CASCADE;
CREATE TABLE ae.organization (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE NOT NULL,
  links text[] DEFAULT NULL,
  contact UUID NOT NULL REFERENCES ae.user (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX ON ae.organization USING btree (name);
ALTER TABLE ae.organization ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.organization;
CREATE POLICY writer ON ae.organization
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );

-- only once:
--ALTER TABLE ae.organization ADD COLUMN links text[] DEFAULT NULL;
--ALTER TABLE ae.organization ADD COLUMN contact UUID DEFAULT NULL REFERENCES ae.user (id) ON DELETE RESTRICT ON UPDATE CASCADE;

DROP TABLE IF EXISTS ae.taxonomy CASCADE;
CREATE TABLE ae.taxonomy (
  -- gets existing guids
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE NOT NULL,
  description text DEFAULT NULL,
  links text[] DEFAULT NULL,
  last_updated date DEFAULT NULL,
  organization_id UUID NOT NULL REFERENCES ae.organization (id) ON DELETE SET NULL ON UPDATE CASCADE,
  is_category_standard boolean DEFAULT FALSE,
  imported_by UUID NOT NULL REFERENCES ae.user (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  terms_of_use text DEFAULT NULL,
  habitat_label varchar(50) DEFAULT NULL,
  habitat_comments text DEFAULT NULL,
  habitat_nr_fns_min integer DEFAULT NULL,
  habitat_nr_fns_max integer DEFAULT NULL,
  CONSTRAINT proper_links CHECK (length(regexp_replace(array_to_string(links, ''),'((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)',''))=0)
);
CREATE INDEX ON ae.taxonomy USING btree (name);
CREATE INDEX ON ae.taxonomy USING btree (category);
ALTER TABLE ae.taxonomy ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.taxonomy;
-- once: drop policy writer ON ae.taxonomy
CREATE POLICY updater ON ae.taxonomy
USING (TRUE)
WITH CHECK (
  organization_id in (select * from ae.organizations_currentuser_is_taxonomywriter)
);
CREATE POLICY inserter ON ae.taxonomy for insert
WITH CHECK (
  (
    organization_id is null
    or organization_id in (select * from ae.organizations_currentuser_is_taxonomywriter)
  ) and (
    current_user_name() in (select * from ae.taxonomy_writers)
  )
);

DROP TABLE IF EXISTS ae.user CASCADE;
CREATE TABLE ae.user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  name text UNIQUE,
  email text UNIQUE,
  role name NOT NULL DEFAULT 'org_writer' check (length(role) < 512),
  pass text NOT NULL DEFAULT 'secret' check (length(pass) > 5),
  CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);
ALTER TABLE ae.user ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS reader_writer ON ae.user;
CREATE POLICY
  reader_writer
  ON ae.user
  USING (
    name = current_user_name()
    OR current_user_name() in (
      select * from ae.organization_admins
    )
    OR current_user = 'anon'
  );

-- only once:
--alter table ae.user add column role name check (length(role) < 512);
--alter table ae.user add column pass text NULL;
-- add data from auth.user
--alter table ae.user alter column role set not null;
--alter table ae.user alter column role set DEFAULT 'org_writer';

DROP TABLE IF EXISTS ae.object CASCADE;
CREATE TABLE ae.object (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  taxonomy_id UUID NOT NULL REFERENCES ae.taxonomy (id) ON DELETE CASCADE ON UPDATE CASCADE,
  -- need to temporarily turn off this reference because it is violated during import
  parent_id UUID DEFAULT NULL,-- REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  name text NOT NULL,
  properties jsonb DEFAULT NULL,
  category text DEFAULT NULL REFERENCES ae.category (name) ON UPDATE CASCADE,
  -- UUID's are by definition lowercase
  -- postgresql converts them to it
  -- see: https://www.postgresql.org/docs/9.6/static/datatype-uuid.html
  -- but UUID's generated by Access are uppercase!!!!
  -- so keep them around in the original form
  id_old text DEFAULT NULL
);
CREATE INDEX ON ae.object USING btree (name);
ALTER TABLE ae.object ENABLE ROW LEVEL SECURITY;
-- once: DROP POLICY IF EXISTS writer ON ae.object;
DROP POLICY IF EXISTS updater ON ae.object;
CREATE POLICY updater ON ae.object
  USING (true)
  WITH CHECK (
    -- need to use view
    -- if use sql, postgre surfaces recursion error
    taxonomy_id IN (SELECT * FROM ae.current_user_writable_taxonomies)
  );
CREATE POLICY inserter on ae.object for insert
  WITH CHECK (
    (
      taxonomy_id is null
      and current_user_name() in (select * from ae.taxonomy_writers)
    )
    or taxonomy_id IN (SELECT * FROM ae.current_user_writable_taxonomies)
  );


-- ae.object to ae.object relationship
-- best to add every relationship twice, see: https://stackoverflow.com/a/17128606/712005
DROP TABLE IF EXISTS ae.synonym CASCADE;
CREATE TABLE ae.synonym (
  object_id UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  object_id_synonym UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (object_id, object_id_synonym)
);
ALTER TABLE ae.synonym ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.synonym;
CREATE POLICY
  writer
  ON ae.synonym
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.taxonomy_writers)
  );

DROP TABLE IF EXISTS ae.property_collection CASCADE;
CREATE TABLE ae.property_collection (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  data_type text DEFAULT 'Eigenschaften-Sammlungen' REFERENCES ae.data_type (name) ON DELETE SET NULL ON UPDATE CASCADE,
  -- later add UNIQUE
  name text NOT NULL,
  description text DEFAULT NULL,
  links text[] DEFAULT NULL,
  combining boolean DEFAULT FALSE,
  organization_id UUID NOT NULL REFERENCES ae.organization (id) ON DELETE SET NULL ON UPDATE CASCADE,
  last_updated date DEFAULT NULL,
  terms_of_use text DEFAULT NULL,
  imported_by UUID NOT NULL REFERENCES ae.user (id) ON DELETE RESTRICT ON UPDATE CASCADE
  --CONSTRAINT proper_links CHECK (length(regexp_replace(array_to_string(links, ''),'((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)',''))=0)
);
CREATE INDEX ON ae.property_collection USING btree (name);
CREATE INDEX ON ae.property_collection USING btree (combining);
ALTER TABLE ae.property_collection ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.property_collection;
DROP POLICY IF EXISTS updater ON ae.property_collection;
CREATE POLICY
  updater
  ON ae.property_collection
  USING (true)
  WITH CHECK (
    organization_id in (select * from ae.organizations_currentuser_is_collectionwriter)
  );
CREATE POLICY inserter ON ae.property_collection for insert
WITH CHECK (
  (
    organization_id is null
    or organization_id in (select * from ae.organizations_currentuser_is_collectionwriter)
  ) and (
    current_user_name() in (select * from ae.collection_writers)
  )
);

DROP TABLE IF EXISTS ae.property_collection_object CASCADE;
CREATE TABLE ae.property_collection_object (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  object_id UUID REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  property_collection_id UUID REFERENCES ae.property_collection (id) ON DELETE CASCADE ON UPDATE CASCADE,
  properties jsonb DEFAULT NULL,
  UNIQUE (object_id, property_collection_id)
);
ALTER TABLE ae.property_collection_object ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.property_collection_object;
DROP POLICY IF EXISTS updater ON ae.property_collection_object;
CREATE POLICY
  updater
  ON ae.property_collection_object
  USING (true)
  WITH CHECK (
    property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );
CREATE POLICY inserter on ae.property_collection_object for insert
  WITH CHECK (
    (
      property_collection_id is null
      and current_user_name() in (select * from ae.collection_writers)
    )
    or property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );

DROP TABLE IF EXISTS ae.relation CASCADE;
CREATE TABLE ae.relation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  property_collection_id UUID NOT NULL REFERENCES ae.property_collection (id) ON DELETE CASCADE ON UPDATE CASCADE,
  object_id UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  object_id_relation UUID NOT NULL REFERENCES ae.object (id) ON DELETE CASCADE ON UPDATE CASCADE,
  relation_type text NOT NULL,
  properties jsonb DEFAULT NULL,
  UNIQUE (property_collection_id, object_id, object_id_relation, relation_type)
);
CREATE INDEX ON ae.relation USING btree (relation_type);
ALTER TABLE ae.relation ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.relation;
DROP POLICY IF EXISTS updater ON ae.relation;
CREATE POLICY
  updater
  ON ae.relation
  USING (true)
  WITH CHECK (
    property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );
CREATE POLICY inserter on ae.relation for insert
  WITH CHECK (
    (
      property_collection_id is null
      and current_user_name() in (select * from ae.collection_writers)
    )
    or property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );

DROP TABLE IF EXISTS ae.role CASCADE;
CREATE TABLE ae.role (
  name text PRIMARY KEY
);
ALTER TABLE ae.role ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.role;
CREATE POLICY writer ON ae.role
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );

DROP TABLE IF EXISTS ae.organization_user;
CREATE TABLE ae.organization_user (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
  organization_id UUID REFERENCES ae.organization (id) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id UUID REFERENCES ae.user (id) ON DELETE CASCADE ON UPDATE CASCADE,
  role text REFERENCES ae.role (name) ON DELETE CASCADE ON UPDATE CASCADE,
  unique(organization_id, user_id, role)
);

-- only once: ALTER TABLE ae.organization_user ADD unique(organization_id, user_id, role);
-- TODO: does not work because there are organization_id's that do not exist in ae.organization
ALTER TABLE ae.organization_user ADD CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES ae.organization (id) ON DELETE CASCADE ON UPDATE CASCADE;
-- TODO: does not work because there are user_id's that do not exist in ae.organization
ALTER TABLE ae.organization_user ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES ae.user (id) ON DELETE CASCADE ON UPDATE CASCADE;
-- run once:
--delete from ae.organization_user where organization_id not in ('a8e5bc98-696f-11e7-b453-3741aafa0388')
--ALTER TABLE  ae.organization_user ALTER COLUMN user_id DROP NOT NULL;
--ALTER TABLE  ae.organization_user ALTER COLUMN role DROP NOT NULL;
--ALTER TABLE  ae.organization_user ALTER COLUMN organization_id DROP NOT NULL;
--ALTER TABLE  ae.organization_user DROP constraint organization_user_pkey;
--ALTER TABLE  ae.organization_user add column id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc();

ALTER TABLE ae.organization_user ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.organization_user;
DROP POLICY IF EXISTS updater ON ae.organization_user;
CREATE POLICY
  updater
  ON ae.organization_user
  USING (true)
  WITH CHECK (
    organization_id in (select * from ae.organizations_currentuser_is_orgadmin)
  );
CREATE POLICY inserter on ae.organization_user for insert
  WITH CHECK (
    (
      organization_id is null
      and current_user_name() in (select * from ae.organization_admins)
    )
    or organization_id IN (SELECT * FROM ae.organizations_currentuser_is_orgadmin)
  );

-- this table is only needed because postgraphql does not pick up
-- the same named function without it
-- see: https://github.com/postgraphql/postgraphql/issues/491
DROP TABLE IF EXISTS ae.tax_properties_by_category CASCADE;

-- this table is only needed because postgraphql does not pick up
-- the same named function without it
-- see: https://github.com/postgraphql/postgraphql/issues/491
DROP TABLE IF EXISTS ae.tax_properties_by_taxonomy CASCADE;
CREATE TABLE ae.tax_properties_by_taxonomy (
  taxonomy_name text,
  property_name text,
  jsontype text,
  count bigint
);

-- TODO: remove after replacing with ...by_taxonomy
DROP TABLE IF EXISTS ae.pco_properties_by_category CASCADE;

-- this table is only needed because postgraphql does not pick up
-- the same named function without it
-- see: https://github.com/postgraphql/postgraphql/issues/491
DROP TABLE IF EXISTS ae.pco_properties_by_taxonomy CASCADE;
CREATE TABLE ae.pco_properties_by_taxonomy (
  property_collection_name text,
  property_name text,
  jsontype text,
  count bigint
);

DROP TABLE IF EXISTS ae.rco_properties_by_category CASCADE;

-- this table is only needed because postgraphql does not pick up
-- the same named function without it
-- see: https://github.com/postgraphql/postgraphql/issues/491
DROP TABLE IF EXISTS ae.rco_properties_by_taxonomy CASCADE;
CREATE TABLE ae.rco_properties_by_taxonomy (
  property_collection_name text,
  relation_type text,
  property_name text,
  jsontype text,
  count bigint
);

DROP TABLE IF EXISTS ae.rco_count_by_taxonomy_relation_type CASCADE;
CREATE TABLE ae.rco_count_by_taxonomy_relation_type(
  property_collection_name text,
  relation_type text,
  count bigint
);

DROP TABLE IF EXISTS ae.categories_of_taxonomies_count CASCADE;
CREATE TABLE ae.categories_of_taxonomies_count (
  name text,
  id uuid,
  count bigint
);

DROP TABLE IF EXISTS ae.categories_of_taxonomies CASCADE;
CREATE TABLE ae.categories_of_taxonomies (
  taxonomy_id uuid,
  category_name text
);

DROP TABLE IF EXISTS ae.taxonomies_of_category CASCADE;
CREATE TABLE ae.taxonomies_of_category (
  category_name text,
  taxonomy_name text,
  object_count bigint
);

DROP TABLE IF EXISTS ae.prop_value CASCADE;
CREATE TABLE ae.prop_value (
  value text
);

-- drop old tables
DROP TABLE IF EXISTS ae.taxonomy_object CASCADE;
