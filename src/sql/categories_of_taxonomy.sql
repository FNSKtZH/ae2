CREATE OR REPLACE FUNCTION ae.categories_of_taxonomy_function(tax_id uuid)
  RETURNS setof ae.category AS
  $$
    SELECT DISTINCT ae.category.*
    FROM ae.taxonomy
      INNER JOIN ae.object
        INNER JOIN ae.category
        ON ae.category.name = ae.object.category
      ON ae.object.taxonomy_id = ae.taxonomy.id
    WHERE ae.taxonomy.id = $1
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.categories_of_taxonomy_function(tax_id uuid)
  OWNER TO postgres;
