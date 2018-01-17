SELECT distinct properties->'Artwert' AS value
FROM ae.property_collection_object
INNER JOIN ae.property_collection ON ae.property_collection_object.property_collection_id = ae.property_collection.id
WHERE ae.property_collection.name = 'ZH Artwert (2000)'
ORDER BY value


CREATE OR REPLACE FUNCTION ae.prop_values_function(table_name text, prop_name text, pc_field_name text, pc_table_name text, pc_name text)
  RETURNS setof ae.prop_value AS
  $$
    DECLARE
      sql text := 'SELECT DISTINCT properties->' || quote_literal(prop_name) || ' AS value FROM ae.' || table_name || ' INNER JOIN ae.' || pc_table_name || ' ON ae.' || table_name || '.' || pc_field_name || ' = ae.' || pc_table_name || '.id WHERE ae.' || pc_table_name || '.name = '  || quote_literal(pc_name) || ' ORDER BY value';
    BEGIN
      --RAISE EXCEPTION  'sql: %', sql;
      RETURN QUERY EXECUTE sql;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.prop_values_function(table_name text, prop_name text, pc_field_name text, pc_table_name text, pc_name text)
  OWNER TO postgres;
