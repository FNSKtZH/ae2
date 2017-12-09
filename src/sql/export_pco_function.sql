CREATE TYPE pco_filter AS (
    comparator text,
    pname text,
    pcnname text,
    value text
);
CREATE OR REPLACE FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[])
  RETURNS setof ae.object AS
  $$
    DECLARE
        tf tax_filter;
        pcof pco_filter;
        sql text := 'SELECT
                ae.property_collection_object.*
            FROM ae.object
                INNER JOIN ae.property_collection_object
                    INNER JOIN ae.property_collection
                    ON ae.property_collection_object.property_collection_id = ae.property_collection.id
                ON ae.object.id = ae.property_collection_object.object_id
            WHERE
                ae.object.id IN (SELECT
                        ae.object.id
                    FROM
                        ae.object
                        INNER JOIN ae.taxonomy
                        ON ae.object.taxonomy_id = ae.taxonomy.id
                    WHERE
                        ae.taxonomy.name = ANY($1)';
    BEGIN
        FOREACH tf IN ARRAY tax_filters
        LOOP
            sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
        END LOOP;
        sql := sql || ')';
        FOREACH pcof IN ARRAY tax_filters
        LOOP
            sql := sql || ' AND (ae.property_collection.name = ' || pcof.pcname || ' AND ae.objecproperty_collection_objectt.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal(pcof.value) || ')';
        END LOOP;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[])
  OWNER TO postgres;
