-- not in use
CREATE OR REPLACE FUNCTION ae.taxonomy_taxonomy_object_level1(taxonomy ae.taxonomy)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT *
    FROM ae.taxonomy_object
    WHERE parent_id IS NULL AND
    taxonomy_id = taxonomy.id
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_taxonomy_object_level1(taxonomy ae.taxonomy)
  OWNER TO postgres;
