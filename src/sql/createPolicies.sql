
ALTER TABLE ae.user ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS reader_writer ON ae.user;
CREATE POLICY reader_writer ON ae.user
  USING (
    name = current_user_name()
    OR current_user_name() in (
      select * from ae.organization_admins
    )
    -- TODO: this only for USING, not for CHECK?
    OR current_user = 'anon'
  );


ALTER TABLE ae.data_type ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.data_type;
CREATE POLICY writer ON ae.data_type
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );


ALTER TABLE ae.category ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.category;
CREATE POLICY writer ON ae.category
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );


ALTER TABLE ae.organization ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.organization;
CREATE POLICY writer ON ae.organization
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );


ALTER TABLE ae.taxonomy ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.taxonomy;
drop policy if exists updater ON ae.taxonomy;
CREATE POLICY updater ON ae.taxonomy
  USING (TRUE)
  WITH CHECK (
    organization_id is null
    or organization_id in (select * from ae.organizations_currentuser_is_taxonomywriter)
  );
drop POLICY if EXISTS inserter on ae.taxonomy;
CREATE POLICY inserter ON ae.taxonomy for insert
  WITH CHECK (
    (
      organization_id is null
      or organization_id in (select * from ae.organizations_currentuser_is_taxonomywriter)
    ) and (
      current_user_name() in (select * from ae.taxonomy_writers)
    )
  );


ALTER TABLE ae.object ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS updater ON ae.object;
CREATE POLICY updater ON ae.object
  USING (true)
  WITH CHECK (
    -- need to use view
    -- if use sql, postgre claims recursion error
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


ALTER TABLE ae.synonym ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.synonym;
CREATE POLICY
  writer
  ON ae.synonym
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.taxonomy_writers)
  );


ALTER TABLE ae.property_collection ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS updater ON ae.property_collection;
CREATE POLICY updater ON ae.property_collection
  USING (true)
  WITH CHECK (
    organization_id in (select * from ae.organizations_currentuser_is_collectionwriter)
  );
drop policy if exists inserter on ae.property_collection;
CREATE POLICY inserter ON ae.property_collection for insert
  WITH CHECK (
    (
      organization_id is null
      or organization_id in (select * from ae.organizations_currentuser_is_collectionwriter)
    ) and (
      current_user_name() in (select * from ae.collection_writers)
    )
  );

ALTER TABLE ae.property_collection_object ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS updater ON ae.property_collection_object;
CREATE POLICY updater ON ae.property_collection_object
  USING (true)
  WITH CHECK (
    property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );
DROP POLICY IF EXISTS inserter ON ae.property_collection_object;
CREATE POLICY inserter on ae.property_collection_object for insert
  WITH CHECK (
    (
      property_collection_id is null
      and current_user_name() in (select * from ae.collection_writers)
    )
    or property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );


ALTER TABLE ae.relation ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS updater ON ae.relation;
CREATE POLICY updater ON ae.relation
  USING (true)
  WITH CHECK (
    property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );
DROP POLICY IF EXISTS inserter ON ae.relation;
CREATE POLICY inserter on ae.relation for insert
  WITH CHECK (
    (
      property_collection_id is null
      and current_user_name() in (select * from ae.collection_writers)
    )
    or property_collection_id IN (SELECT * FROM ae.current_user_writable_collections)
  );


ALTER TABLE ae.role ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS writer ON ae.role;
CREATE POLICY writer ON ae.role
  USING (true)
  WITH CHECK (
    current_user_name() in (select * from ae.organization_admins)
  );


ALTER TABLE ae.organization_user ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS updater ON ae.organization_user;
CREATE POLICY updater ON ae.organization_user
  USING (true)
  WITH CHECK (
    organization_id in (select * from ae.organizations_currentuser_is_orgadmin)
  );
DROP POLICY IF EXISTS inserter ON ae.organization_user;
CREATE POLICY inserter on ae.organization_user for insert
  WITH CHECK (
    (
      organization_id is null
      and current_user_name() in (select * from ae.organization_admins)
    )
    or organization_id IN (SELECT * FROM ae.organizations_currentuser_is_orgadmin)
  );

