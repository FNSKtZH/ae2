-- needed because
-- can't filter for null in graphql (yet)
-- trick: passing name is optional
CREATE OR REPLACE FUNCTION ae.property_collection_by_data_type(datatype text)
  RETURNS setof ae.property_collection AS
  $$
    SELECT ae.property_collection.*
    FROM ae.property_collection
    WHERE
      ae.property_collection.data_type = $1
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.property_collection_by_data_type(datatype text)
  OWNER TO postgres;
