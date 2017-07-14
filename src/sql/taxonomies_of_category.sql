CREATE OR REPLACE FUNCTION ae.taxonomies_of_category(category text)
  RETURNS setof ae.taxonomy AS
  $$
    SELECT DISTINCT ae.taxonomy.*
    FROM ae.taxonomy
      INNER JOIN ae.object
        INNER JOIN ae.category
        ON ae.category.name = ae.object.category
      ON ae.object.taxonomy_id = ae.taxonomy.id
    WHERE ae.category.name = $1
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomies_of_category(category text)
  OWNER TO postgres;
