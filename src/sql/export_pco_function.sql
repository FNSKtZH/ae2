CREATE TYPE pco_filter AS (
    comparator text,
    pname text,
    taxname text,
    value text
);
CREATE OR REPLACE FUNCTION ae.export_object(export_taxonomies text[], pco_filters pco_filter[])
  RETURNS setof ae.object AS
  $$
    DECLARE
        f pco_filter;
        sql text := 'SELECT ae.object.* FROM ae.object INNER JOIN ae.taxonomy ON ae.object.taxonomy_id = ae.taxonomy.id WHERE ae.taxonomy.name = ANY($1)';
    BEGIN
        FOREACH f IN ARRAY pco_filters
        LOOP
            sql := sql || ' AND ae.object.properties->>' || quote_literal(f.pname) || ' ' || f.comparator || ' ' || quote_literal(f.value);
        END LOOP;
    RETURN QUERY EXECUTE sql USING export_taxonomies, pco_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_object(export_taxonomies text[], pco_filters pco_filter[])
  OWNER TO postgres;
