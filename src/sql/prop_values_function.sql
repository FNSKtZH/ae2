SELECT distinct ae.property_collection_object.properties->'Artwert' AS value
FROM ae.property_collection_object
ORDER BY value


CREATE OR REPLACE FUNCTION ae.prop_values_function(table_name text, prop text)
  RETURNS setof ae.prop_value AS
  $$
    DECLARE
      --sql text := 'SELECT distinct ae.$1.properties->$2 AS value FROM ae.$1 ORDER BY value';
      sql text := 'SELECT distinct ae.' || $1 || '.properties->' || quote_literal($2) || ' AS value FROM ae.' || $1 || ' ORDER BY value';
    BEGIN
      --RAISE EXCEPTION  'sql: %', sql;
      RETURN QUERY EXECUTE sql USING table_name, prop;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.prop_values_function(table_name text, prop text)
  OWNER TO postgres;
