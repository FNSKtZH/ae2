CREATE OR REPLACE FUNCTION ae.export_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], pco_properties pco_property[])
  RETURNS setof ae.property_collection_object AS
  $$
    DECLARE
        tf tax_filter;
        pcop pco_property;
        sql text := 'SELECT
                        ae.property_collection_object.*
                    FROM ae.object
                        INNER JOIN ae.property_collection_object
                            INNER JOIN ae.property_collection
                            ON ae.property_collection_object.property_collection_id = ae.property_collection.id
                        ON ae.object.id = ae.property_collection_object.object_id
                    WHERE
                        ae.object.id IN (';
        objSql text;
    BEGIN

        sql := sql || 'SELECT id FROM ' || export_object(export_taxonomies, tax_filters, pco_filters, rco_filters) || ')';
        sql := sql || ' AND ae.property_collection.name IN(';

        IF cardinality(pco_properties) = 0 THEN
            sql := sql || 'false';
        ELSE
            FOREACH pcop IN ARRAY pco_properties
                LOOP
                IF pcop = pco_properties[1] THEN
                    sql := sql || quote_literal(pcop.pcname);
                ELSE
                    sql := sql || ',' || quote_literal(pcop.pcname);
                END IF;
                sql := sql || ')';
            END LOOP;
        END IF;
        sql := sql || ')';

    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters, pco_properties;
    END
  $$
  LANGUAGE plpgsql STABLE;

ALTER FUNCTION ae.export_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], pco_properties pco_property[])
  OWNER TO postgres;
