-- needed because
-- can't filter for null in graphql (yet)
-- trick: passing name is optional
CREATE OR REPLACE FUNCTION ae.category_taxonomy_by_name(category ae.category, name text)
  RETURNS setof ae.taxonomy AS
  $$
    SELECT *
    FROM ae.taxonomy
    WHERE
      category.name = taxonomy.category AND
      1 = CASE
        WHEN $2 IS NULL THEN 1
        WHEN ae.taxonomy.name = $2 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.category_taxonomy_by_name(category ae.category, name text)
  OWNER TO postgres;
