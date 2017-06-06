-- needed because
-- can't filter for null in graphql (yet)
-- trick: passing name is optional
CREATE OR REPLACE FUNCTION ae.data_type_category_by_data_type(data_type ae.data_type, datatypename text)
  RETURNS setof ae.category AS
  $$
    SELECT ae.category.*
    FROM ae.category
      INNER JOIN ae.data_type
      ON ae.data_type.name = ae.category.data_type
    WHERE
      ae.data_type.name = data_type_category_by_data_type.data_type.name AND
      1 = CASE
        WHEN $2 IS NULL THEN 1
        WHEN ae.data_type.name = $2 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.data_type_category_by_data_type(data_type ae.data_type, datatypename text)
  OWNER TO postgres;
