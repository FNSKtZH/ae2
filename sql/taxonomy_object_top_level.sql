CREATE OR REPLACE FUNCTION ae.taxonomy_object_toplevel()
  RETURNS setof ae.taxonomy_object AS
  $$
    select *
    from ae.taxonomy_object
    where parent_id is null
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_toplevel()
  OWNER TO postgres;
