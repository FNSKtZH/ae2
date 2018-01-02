CREATE OR REPLACE FUNCTION ae.categories_of_taxonomies_function()
  RETURNS setof ae.categories_of_taxonomies AS
  $$
    SELECT DISTINCT
      ae.taxonomy.id as taxonomy_id,
      ae.category.name as category_name
    FROM ae.taxonomy
      INNER JOIN ae.object
        INNER JOIN ae.category
        ON ae.category.name = ae.object.category
      ON ae.object.taxonomy_id = ae.taxonomy.id
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.categories_of_taxonomies_function()
  OWNER TO postgres;
