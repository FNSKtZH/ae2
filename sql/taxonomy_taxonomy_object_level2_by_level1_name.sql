CREATE OR REPLACE FUNCTION ae.taxonomy_object_taxonomy_object_level2(taxonomy_object ae.taxonomy_object, taxonomyname text, level1name text)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT to2.*
    FROM ae.taxonomy
      INNER JOIN ae.taxonomy_object AS to1
      ON ae.taxonomy.id = to1.taxonomy_id
        INNER JOIN ae.taxonomy_object AS to2
        ON to1.id = to2.parent_id
    WHERE
      to1.parent_id IN (
        SELECT id
        FROM ae.taxonomy_object
        WHERE parent_id IS NULL
      ) AND
      ae.taxonomy.name = taxonomyname AND
      1 = CASE
        WHEN $3 IS NULL THEN 1
        WHEN to1.name = $3 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_taxonomy_object_level2(taxonomy_object ae.taxonomy_object, taxonomyname text, level1name text)
  OWNER TO postgres;
