CREATE OR REPLACE FUNCTION ae.rco_properties_by_categories_function(categories text[])
  RETURNS setof ae.rco_properties_by_category AS
  $$
    WITH jsontypes AS (
      SELECT
        ae.relation_collection.name AS relation_collection_name,
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
        INNER JOIN ae.relation_collection_object
        ON ae.object.id = ae.relation_collection_object.object_id
          INNER JOIN ae.relation_collection
          ON ae.relation_collection.id = ae.relation_collection_object.relation_collection_id
          INNER JOIN ae.relation
          ON ae.relation.object_id = ae.relation_collection.id AND
          ae.relation.relation_collection_id = ae.relation_collection.id,
        jsonb_each(ae.relation.properties) AS json_data
      WHERE
        ae.object.category = ANY(categories)
    )
    SELECT
      *,
      count(*)
    FROM
      jsontypes
    GROUP BY
      relation_collection_name,
      property_name,
      jsontype
    ORDER BY
      relation_collection_name,
      property_name,
      jsontype
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.rco_properties_by_categories_function(categories text[])
  OWNER TO postgres;
