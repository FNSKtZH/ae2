CREATE OR REPLACE FUNCTION ae.categories_of_taxonomies_count_function()
  RETURNS setof ae.categories_of_taxonomies_count AS
  $$
    WITH categoryTaxonomies AS (
      SELECT ae.category.name, ae.category.id, ae.taxonomy.id AS taxonomy_id
      FROM ae.taxonomy
        INNER JOIN ae.object
          INNER JOIN ae.category
          ON ae.category.name = ae.object.category
        ON ae.object.taxonomy_id = ae.taxonomy.id
      GROUP BY ae.category.name, ae.category.id, ae.taxonomy.id
    )
    SELECT name, id, count(*) AS count
    FROM categoryTaxonomies
    GROUP BY name, id
    ORDER BY name
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.categories_of_taxonomies_count_function()
  OWNER TO postgres;
