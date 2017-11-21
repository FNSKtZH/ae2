CREATE OR REPLACE FUNCTION ae.tax_properties_by_categories_function(categories text[])
  RETURNS setof ae.tax_properties_by_category AS
  $$
    WITH jsontypes AS (
      SELECT
        ae.taxonomy.name AS taxonomy_name,
        json_data.key AS property_name,
        CASE WHEN left(json_data.value::text,1) = '"'  THEN 'String'
          WHEN json_data.value::text ~ '^-?\d' THEN
          CASE WHEN json_data.value::text ~ '\.' THEN 'Number'
            ELSE 'Integer'
          END
          WHEN left(json_data.value::text,1) = '['  THEN 'Array'
          WHEN left(json_data.value::text,1) = '{'  THEN 'Object'
          WHEN json_data.value::text in ('true', 'false')  THEN 'Boolean'
          WHEN json_data.value::text = 'null'  THEN 'Null'
          ELSE 'unknown'
        END as jsontype
      FROM
        ae.object
        INNER JOIN ae.taxonomy
        ON ae.taxonomy.id = ae.object.taxonomy_id,
        jsonb_each(ae.object.properties) AS json_data
      WHERE
        ae.object.category = ANY(categories)
    )
    SELECT
      *,
      count(*)
    FROM
      jsontypes
    GROUP BY
      taxonomy_name,
      property_name,
      jsontype
    ORDER BY
      taxonomy_name,
      property_name,
      jsontype
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.tax_properties_by_categories_function(categories text[])
  OWNER TO postgres;
