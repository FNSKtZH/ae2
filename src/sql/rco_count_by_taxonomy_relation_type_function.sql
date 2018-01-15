CREATE OR REPLACE FUNCTION ae.rco_count_by_taxonomy_relation_type_function()
  RETURNS setof ae.rco_count_by_taxonomy_relation_type AS
  $$
    SELECT
      ae.property_collection.name AS property_collection_name,
      ae.relation.relation_type,
      count(*)
    FROM
      ae.relation
      INNER JOIN ae.property_collection
      ON ae.property_collection.id = ae.relation.property_collection_id
    GROUP BY
      property_collection_name,
      relation_type
    ORDER BY
      property_collection_name,
      relation_type
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.rco_count_by_taxonomy_relation_type_function()
  OWNER TO postgres;
