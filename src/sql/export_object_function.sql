CREATE TYPE tax_filter AS (
    comparator text,
    pname text,
    taxname text,
    value text
);
CREATE OR REPLACE FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[])
  RETURNS setof ae.object AS
  $$
    DECLARE
        tf tax_filter;
        sql text := 'SELECT ae.object.* FROM ae.object INNER JOIN ae.taxonomy ON ae.object.taxonomy_id = ae.taxonomy.id WHERE ae.taxonomy.name = ANY($1)';
    BEGIN
        FOREACH tf IN ARRAY tax_filters
        LOOP
            IF tf.comparator IN ('ILIKE', 'LIKE') THEN
                sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
            ELSE
                sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
            END IF;
        END LOOP;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[])
  OWNER TO postgres;
