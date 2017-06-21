CREATE OR REPLACE FUNCTION ae.taxonomy_object_by_taxonomy_object_name(taxonomy_object_name text)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT *
    FROM ae.taxonomy_object
    WHERE
      ae.taxonomy_object.name ilike ('%' || $1 || '%')
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_by_taxonomy_object_name(taxonomy_object_name text)
  OWNER TO postgres;
