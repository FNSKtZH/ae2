-- needed because
-- can't filter for null in graphql (yet)
-- trick: passing name is optional
CREATE OR REPLACE FUNCTION ae.relation_collection_by_data_type(datatype text)
  RETURNS setof ae.relation_collection AS
  $$
    SELECT ae.relation_collection.*
    FROM ae.relation_collection
    WHERE
      ae.relation_collection.data_type = $1
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.relation_collection_by_data_type(datatype text)
  OWNER TO postgres;
