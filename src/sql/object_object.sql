CREATE OR REPLACE FUNCTION ae.object_object(taxonomy_object ae.object, taxonomy_id UUID)
  RETURNS setof ae.object AS
  $$
    SELECT to1.*
    FROM ae.object AS to1
      INNER JOIN ae.object AS to2
      ON to2.parent_id = to1.id
    WHERE
      to1.id = object_object.taxonomy_object.id AND
      1 = CASE
        WHEN $2 IS NULL THEN 1
        WHEN to1.id = $2 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.object_object(taxonomy_object ae.object, taxonomy_id UUID)
  OWNER TO postgres;
