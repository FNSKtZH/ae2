-- from: https://stackoverflow.com/a/31617884/712005
WITH jsontypes AS (
  SELECT
    ae.property_collection.name AS property_collection_name,
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
    ae.property_collection_object
      INNER JOIN ae.property_collection
      ON ae.property_collection.id = ae.property_collection_object.property_collection_id,
    jsonb_each(ae.property_collection_object.properties) AS json_data
)
SELECT
  *,
  count(*)
FROM
  jsontypes
GROUP BY
  property_collection_name,
  property_name,
  jsontype
ORDER BY
  property_collection_name,
  property_name,
  jsontype;
