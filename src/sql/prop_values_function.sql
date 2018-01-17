SELECT distinct properties->'Artwert' AS value
FROM ae.property_collection_object
WHERE property_collection_id = 'c596a521-696f-11e7-b712-f90bfedd3cfd'
ORDER BY value


CREATE OR REPLACE FUNCTION ae.prop_values_function(table_name text, prop_name text, pcfield_name text, pc_id uuid)
  RETURNS setof ae.prop_value AS
  $$
    DECLARE
      sql text := 'SELECT DISTINCT properties->' || quote_literal(prop_name) || ' AS value FROM ae.' || table_name || ' WHERE ' || pcfield_name || ' = '  || quote_literal(pc_id) || ' ORDER BY value';
    BEGIN
      --RAISE EXCEPTION  'sql: %', sql;
      RETURN QUERY EXECUTE sql;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.prop_values_function(table_name text, prop_name text, pcfield_name text, pc_id uuid)
  OWNER TO postgres;
