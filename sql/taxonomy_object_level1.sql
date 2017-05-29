CREATE OR REPLACE FUNCTION ae.taxonomy_object_level1()
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT *
    FROM ae.taxonomy_object
    WHERE parent_id IS NULL
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_level1()
  OWNER TO postgres;
