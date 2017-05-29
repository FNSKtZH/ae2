-- not in use
CREATE OR REPLACE FUNCTION ae.taxonomy_object_toplevel(taxonomy_object ae.taxonomy_object)
  RETURNS boolean AS
  $$
    select
      case
        when taxonomy_object.parent_id is null then true
        else false
      end
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_toplevel(taxonomy_object ae.taxonomy_object)
  OWNER TO postgres;
