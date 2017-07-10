CREATE OR REPLACE FUNCTION ae.object_by_object_name(object_name text)
  RETURNS setof ae.object AS
  $$
    SELECT *
    FROM ae.object
    WHERE
      ae.object.name ilike ('%' || $1 || '%')
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.object_by_object_name(object_name text)
  OWNER TO postgres;
