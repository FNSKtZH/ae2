-- needed because
-- can't filter for null in graphql (yet)
CREATE OR REPLACE FUNCTION ae.taxonomy_taxonomy_object_level1_by_name(taxonomy ae.taxonomy, name text)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT *
    FROM ae.taxonomy_object
    WHERE parent_id IS NULL AND
    taxonomy_id = taxonomy.id AND
    ae.taxonomy_object.name = $2
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_taxonomy_object_level1_by_name(taxonomy ae.taxonomy, name text)
  OWNER TO postgres;
