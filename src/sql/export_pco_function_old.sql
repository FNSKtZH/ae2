CREATE OR REPLACE FUNCTION ae.export_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], pco_properties pco_property[])
  RETURNS setof ae.property_collection_object AS
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
                        ae.object.id IN (';
        objSql text := 'SELECT
                            ae.object.id
                        FROM
                            ae.object
                            INNER JOIN ae.taxonomy
                            ON ae.object.taxonomy_id = ae.taxonomy.id
                        WHERE
                            ae.taxonomy.name = ANY($1)'
    BEGIN
        FOREACH tf IN ARRAY tax_filters
        LOOP
            IF tf.comparator IN ('ILIKE', 'LIKE') THEN
                objSql := objSql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
            ELSE
                objSql := objSql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
            END IF;
        END LOOP;

        sql := objSql || ')';

        FOREACH pcof IN ARRAY pco_filters
        LOOP
            sql := sql || ' AND (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            IF pcof.comparator IN ('ILIKE', 'LIKE') THEN
                sql := sql || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal('%' || pcof.value || '%');
            ELSE
                sql := sql || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal(pcof.value);
            END IF;
            sql := sql || ')';
        END LOOP;

        IF cardinality(pco_properties) = 0 THEN
            pcopSqlWhere := pcopSqlWhere || 'false';
        ELSE
            FOREACH pcop IN ARRAY pco_properties
                LOOP
                IF pcop = pco_properties[1] THEN
                    pcopSqlWhere := pcopSqlWhere || ' (ae.property_collection.name = ' || quote_literal(pcop.pcname);
                ELSE
                    pcopSqlWhere := pcopSqlWhere || ' AND (ae.property_collection.name = ' || quote_literal(pcop.pcname);
                END IF;
                pcopSqlWhere := pcopSqlWhere || ')';
            END LOOP;
        END IF;

    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, pco_properties, pco_properties;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], pco_properties pco_property[])
  OWNER TO postgres;
