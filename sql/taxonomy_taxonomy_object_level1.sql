CREATE OR REPLACE FUNCTION ae.taxonomy_taxonomy_object_level1(taxonomy ae.taxonomy, taxonomy_id uuid)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT to1.*
    FROM ae.taxonomy_object AS to1
      INNER JOIN ae.taxonomy
      ON ae.taxonomy.id = to1.taxonomy_id
    WHERE
      to1.parent_id IS NULL AND
      1 = CASE
        WHEN $2 IS NULL THEN 1
        WHEN ae.taxonomy.id = $2 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_taxonomy_object_level1(taxonomy ae.taxonomy, taxonomy_id uuid)
  OWNER TO postgres;
