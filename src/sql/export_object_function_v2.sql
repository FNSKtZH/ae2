CREATE OR REPLACE FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  RETURNS setof ae.object AS
  $$
    DECLARE
        sql text := 'SELECT
                        ae.object.*
                    FROM
                        ae.object
                    WHERE
                        ae.object.id IN (';
        tf tax_filter;
        pcof pco_filter;
        pcofSql text := 'SELECT DISTINCT
                ae.object.id
            FROM ae.object
                INNER JOIN ae.property_collection_object
                    INNER JOIN ae.property_collection
                    ON ae.property_collection_object.property_collection_id = ae.property_collection.id
                ON ae.object.id = ae.property_collection_object.object_id
            WHERE
                ae.object.id IN (
                    SELECT
                        ae.object.id
                    FROM
                        ae.object
                        INNER JOIN ae.taxonomy
                        ON ae.object.taxonomy_id = ae.taxonomy.id
                    WHERE
                        ae.taxonomy.name = ANY($1)';
        rcof rco_filter;
        rcofSql text := 'SELECT DISTINCT
                ae.object.id
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
                        INNER JOIN ae.taxonomy
                        ON ae.object.taxonomy_id = ae.taxonomy.id
                    WHERE
                        ae.taxonomy.name = ANY($1)';
    BEGIN
        FOREACH tf IN ARRAY tax_filters
        LOOP
            IF tf.comparator IN ('ILIKE', 'LIKE') THEN
                pcofSql := pcofSql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
            ELSE
                pcofSql := pcofSql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
            END IF;
        END LOOP;
        pcofSql := pcofSql || ')';
        FOREACH pcof IN ARRAY pco_filters
        LOOP
            pcofSql := pcofSql || ' AND (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            IF pcof.comparator IN ('ILIKE', 'LIKE') THEN
                pcofSql := pcofSql || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal('%' || pcof.value || '%');
            ELSE
                pcofSql := pcofSql || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal(pcof.value);
            END IF;
            pcofSql := pcofSql || ')';
        END LOOP;

        sql := sql || pcofSql || ') OR ae.object.id IN (';

        FOREACH tf IN ARRAY tax_filters
        LOOP
            IF tf.comparator IN ('ILIKE', 'LIKE') THEN
                rcofSql := rcofSql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
            ELSE
                rcofSql := rcofSql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
            END IF;
        END LOOP;
        rcofSql := rcofSql || ')';
        FOREACH rcof IN ARRAY rco_filters
        LOOP
            rcofSql := rcofSql || ' AND (ae.property_collection.name = ' || quote_literal(rcof.pcname);
            IF rcof.comparator IN ('ILIKE', 'LIKE') THEN
                rcofSql := rcofSql || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal('%' || rcof.value || '%');
            ELSE
                rcofSql := rcofSql || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal(rcof.value);
            END IF;
            rcofSql := rcofSql || ')';
        END LOOP;
        
        sql := sql || rcofSql || ')';

    RAISE LOG 'sql built: %', sql;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  OWNER TO postgres;
