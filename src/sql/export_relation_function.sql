CREATE OR REPLACE FUNCTION ae.export_rco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], rco_properties rco_property[])
  RETURNS setof ae.relation AS
  $$
    DECLARE
        rcop rco_property;
        sql text := 'SELECT
                        ae.relation.*
                    FROM ae.object
                        INNER JOIN ae.relation
                            INNER JOIN ae.property_collection
                            ON ae.relation.property_collection_id = ae.property_collection.id
                        ON ae.object.id = ae.relation.object_id
                    WHERE
                        ae.object.id IN (
                            SELECT id FROM ae.export_object($1, $2, $3, $4)
                        )
                        AND ae.property_collection.name IN(';
    BEGIN
        IF cardinality(rco_properties) = 0 THEN
            sql := sql || 'false';
        ELSE
            FOREACH rcop IN ARRAY rco_properties
                LOOP
                IF rcop = rco_properties[1] THEN
                    sql := sql || quote_literal(rcop.pcname);
                ELSE
                    sql := sql || ',' || quote_literal(rcop.pcname);
                END IF;
            END LOOP;
        END IF;
        sql := sql || ')';
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters, rco_properties;
    END
  $$
  LANGUAGE plpgsql STABLE;

ALTER FUNCTION ae.export_rco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], rco_properties rco_property[])
  OWNER TO postgres;
