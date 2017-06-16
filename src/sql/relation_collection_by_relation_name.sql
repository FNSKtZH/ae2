CREATE OR REPLACE FUNCTION ae.relation_collection_by_relation_name(relation_name text)
  RETURNS setof ae.relation_collection AS
  $$
    SELECT *
    FROM ae.relation_collection
    WHERE
      ae.relation_collection.name ilike ('%' || $1 || '%')
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.relation_collection_by_relation_name(relation_name text)
  OWNER TO postgres;
