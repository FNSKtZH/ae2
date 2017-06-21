CREATE OR REPLACE FUNCTION ae.taxonomy_object_taxonomy_object(taxonomy_object ae.taxonomy_object, taxonomy_id Uuid)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT to1.*
    FROM ae.taxonomy_object AS to1
      INNER JOIN ae.taxonomy_object AS to2
      ON to2.parent_id = to1.id
    WHERE
      to1.id = taxonomy_object_taxonomy_object.taxonomy_object.id AND
      1 = CASE
        WHEN $2 IS NULL THEN 1
        WHEN to1.id = $2 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_taxonomy_object(taxonomy_object ae.taxonomy_object, taxonomy_id Uuid)
  OWNER TO postgres;
