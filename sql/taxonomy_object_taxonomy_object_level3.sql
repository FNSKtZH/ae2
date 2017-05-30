CREATE OR REPLACE FUNCTION ae.taxonomy_object_taxonomy_object_level3(taxonomy_object ae.taxonomy_object, taxonomyname text, level1name text, level2name text)
  RETURNS setof ae.taxonomy_object AS
  $$
    SELECT to3.*
    FROM ae.taxonomy
      INNER JOIN ae.taxonomy_object AS to1
      ON ae.taxonomy.id = to1.taxonomy_id
        INNER JOIN ae.taxonomy_object AS to2
        ON to1.id = to2.parent_id
          INNER JOIN ae.taxonomy_object AS to3
          ON to2.id = to3.parent_id
    WHERE
      to1.parent_id IS NULL AND
      ae.taxonomy.name = $2 AND
      1 = CASE
        WHEN $3 IS NULL THEN 1
        WHEN to1.name = $3 THEN 1
        ELSE 2
      END AND
      1 = CASE
        WHEN $4 IS NULL THEN 1
        WHEN to2.name = $4 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_taxonomy_object_level3(taxonomy_object ae.taxonomy_object, taxonomyname text, level1name text, level2name text)
  OWNER TO postgres;
