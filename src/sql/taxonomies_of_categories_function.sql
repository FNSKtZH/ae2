-- TODO
CREATE OR REPLACE FUNCTION ae.taxonomies_of_categories_function()
  RETURNS setof ae.taxonomies_of_category AS
  $$
    WITH categoryTaxonomies AS (
      SELECT ae.object.id, ae.category.name AS category_name, ae.taxonomy.name AS taxonomy_name
      FROM ae.taxonomy
        INNER JOIN ae.object
          INNER JOIN ae.category
          ON ae.category.name = ae.object.category
        ON ae.object.taxonomy_id = ae.taxonomy.id
      GROUP BY ae.object.id, ae.category.name, ae.taxonomy.name
    ), categoryTaxonomiesWithoutObjects AS (
      SELECT ae.category.name AS category_name, ae.taxonomy.name AS taxonomy_name, 1::bigint as object_count
      FROM ae.taxonomy, ae.category
      WHERE NOT EXISTS (
        select ae.object.id from ae.object
        where ae.object.taxonomy_id = ae.taxonomy.id
      )
    )
    SELECT category_name, taxonomy_name, count(*) AS object_count
    FROM categoryTaxonomies
    GROUP BY category_name, taxonomy_name
    ORDER BY category_name, taxonomy_name
    UNION select category_name, taxonomy_name, object_count
    from categoryTaxonomiesWithoutObjects
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomies_of_categories_function()
  OWNER TO postgres;