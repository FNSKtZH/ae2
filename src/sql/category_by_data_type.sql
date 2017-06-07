-- needed because
-- can't filter for null in graphql (yet)
-- trick: passing name is optional
CREATE OR REPLACE FUNCTION ae.category_by_data_type(datatype text)
  RETURNS setof ae.category AS
  $$
    SELECT ae.category.*
    FROM ae.category
    WHERE
      ae.category.data_type = $1
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.category_by_data_type(datatype text)
  OWNER TO postgres;
