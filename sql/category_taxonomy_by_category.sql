-- needed because
-- can't filter for null in graphql (yet)
-- trick: passing name is optional
CREATE OR REPLACE FUNCTION ae.category_taxonomy_by_category(category ae.category, name text)
  RETURNS setof ae.taxonomy AS
  $$
    SELECT ae.taxonomy.*
    FROM ae.taxonomy
      INNER JOIN ae.category
      ON ae.category.name = ae.taxonomy.category
    WHERE
      1 = CASE
        WHEN $2 IS NULL THEN 1
        WHEN ae.category.name = $2 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.category_taxonomy_by_category(category ae.category, name text)
  OWNER TO postgres;
