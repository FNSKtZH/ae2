CREATE OR REPLACE FUNCTION ae.export_synonym_rco(export_taxonomies text[], tax_filters tax_filter[], rco_filters rco_filter[])
  RETURNS setof ae.relation AS
  $$
    DECLARE
        tf tax_filter;
        rcof rco_filter;
        sql text := 'SELECT
                ae.relation.*
            FROM ae.object
                INNER JOIN ae.relation
                    INNER JOIN ae.property_collection
                    ON ae.relation.property_collection_id = ae.property_collection.id
                ON ae.object.id = ae.relation.object_id
            WHERE
                ae.object.id IN (
                    SELECT
                        ae.object.id
                    FROM
                        ae.object
                        INNER JOIN ae.synonym
                        ON ae.object.id = ae.synonym.object_id
                    WHERE
                        ae.synonym.object_id_synonym IN (
                            SELECT
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
            IF tf.comparator IN ('ILIKE', 'LIKE') THEN
                sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
            ELSE
                sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
            END IF;
        END LOOP;
        sql := sql || '))';
        FOREACH rcof IN ARRAY rco_filters
        LOOP
            sql := sql || ' AND (ae.property_collection.name = ' || quote_literal(rcof.pcname) || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal(rcof.value) || ')';
        END LOOP;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, rco_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_synonym_rco(export_taxonomies text[], tax_filters tax_filter[], rco_filters rco_filter[])
  OWNER TO postgres;
