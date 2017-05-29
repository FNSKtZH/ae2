CREATE OR REPLACE FUNCTION ae.taxonomy_object_toplevel(taxonomy ae.taxonomy)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT *
    FROM ae.taxonomy_object
    WHERE parent_id IS NULL AND
    taxonomy_id = taxonomy.id
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_toplevel(taxonomy ae.taxonomy)
  OWNER TO postgres;
