CREATE OR REPLACE FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  RETURNS setof ae.object AS
  $$
    DECLARE
        sql text := 'SELECT
                        ae.object.*
                    FROM
                        ae.object
                        INNER JOIN ae.taxonomy
                        ON ae.taxonomy.id = ae.object.taxonomy_id
                    WHERE
                        ae.taxonomy.name = ANY($1)';
        tf tax_filter;
        pcof pco_filter;
        pcofSql text := 'SELECT DISTINCT
                            ae.property_collection_object.object_id
                        FROM ae.property_collection_object
                            INNER JOIN ae.property_collection
                            ON ae.property_collection_object.property_collection_id = ae.property_collection.id
                        WHERE';
        rcof rco_filter;
        rcofSql text := 'SELECT DISTINCT
                            ae.relation.object_id
                        FROM ae.relation
                            INNER JOIN ae.property_collection
                            ON ae.relation.property_collection_id = ae.property_collection.id
                        WHERE';
    BEGIN
        FOREACH tf IN ARRAY tax_filters
        LOOP
            IF tf.comparator IN ('ILIKE', 'LIKE') THEN
                sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
            ELSE
                sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
            END IF;
        END LOOP;

        FOREACH pcof IN ARRAY pco_filters
        LOOP
            IF pcof = pco_filters[1] THEN
                pcofSql := pcofSql || ' (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            ELSE
                pcofSql := pcofSql || ' AND (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            END IF;
            IF pcof.comparator IN ('ILIKE', 'LIKE') THEN
                pcofSql := pcofSql || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal('%' || pcof.value || '%');
            ELSE
                pcofSql := pcofSql || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal(pcof.value);
            END IF;
            pcofSql := pcofSql || ')';
        END LOOP;

        sql := sql || ' AND ae.object.id IN (' || pcofSql || ') OR ae.object.id IN (';

        FOREACH rcof IN ARRAY rco_filters
        LOOP
            IF pcof = rco_filters[1] THEN
                rcofSql := rcofSql || ' (ae.property_collection.name = ' || quote_literal(rcof.pcname);
            ELSE
                rcofSql := rcofSql || ' AND (ae.property_collection.name = ' || quote_literal(rcof.pcname);
            END IF;
            IF rcof.comparator IN ('ILIKE', 'LIKE') THEN
                rcofSql := rcofSql || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal('%' || rcof.value || '%');
            ELSE
                rcofSql := rcofSql || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal(rcof.value);
            END IF;
            rcofSql := rcofSql || ')';
        END LOOP;
        
        sql := sql || rcofSql || ')';

    RAISE LOG 'sql built: %', sql;
    RAISE EXCEPTION  'sql built: %', sql;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  OWNER TO postgres;
