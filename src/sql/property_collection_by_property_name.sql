CREATE OR REPLACE FUNCTION ae.property_collection_by_property_name(property_name text)
  RETURNS setof ae.property_collection AS
  $$
    SELECT *
    FROM ae.property_collection
    WHERE
      ae.property_collection.name ilike ('%' || $1 || '%')
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.property_collection_by_property_name(property_name text)
  OWNER TO postgres;
