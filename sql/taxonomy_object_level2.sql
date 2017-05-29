CREATE OR REPLACE FUNCTION ae.taxonomy_object_level2()
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT *
    FROM ae.taxonomy_object
    WHERE parent_id IN (
      SELECT id
      FROM ae.taxonomy_object
      WHERE parent_id IS NULL
    )
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_level2()
  OWNER TO postgres;
