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
                        ON ae.property_collection_object.property_collection_id = ae.property_collection.id';
      pcofSqlWhere text := '';
      rcof rco_filter;
      rcofSql text := 'SELECT DISTINCT
                        ae.relation.object_id
                      FROM ae.relation
                        INNER JOIN ae.property_collection
                        ON ae.relation.property_collection_id = ae.property_collection.id';
      rcofSqlWhere text := '';
    BEGIN
      FOREACH tf IN ARRAY tax_filters
      LOOP
        IF tf.comparator IN ('ILIKE', 'LIKE') THEN
          sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
        ELSE
          sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
        END IF;
      END LOOP;

      IF cardinality(pco_filters) = 0 THEN
        pcofSqlWhere := pcofSqlWhere || 'false';
      ELSE
          FOREACH pcof IN ARRAY pco_filters
          LOOP
            IF pcof = pco_filters[1] THEN
              pcofSqlWhere := pcofSqlWhere || ' (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            ELSE
              pcofSqlWhere := pcofSqlWhere || ' AND (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            END IF;
            IF pcof.comparator IN ('ILIKE', 'LIKE') THEN
              pcofSqlWhere := pcofSqlWhere || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal('%' || pcof.value || '%');
            ELSE
              pcofSqlWhere := pcofSqlWhere || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal(pcof.value);
            END IF;
            pcofSqlWhere := pcofSqlWhere || ')';
        END LOOP;
      END IF;

      IF cardinality(rco_filters) = 0 THEN
        rcofSqlWhere := rcofSqlWhere || 'false';
      ELSE
        FOREACH rcof IN ARRAY rco_filters
        LOOP
          IF rcof = rco_filters[1] THEN
            rcofSqlWhere := rcofSqlWhere || ' (ae.property_collection.name = ' || quote_literal(rcof.pcname);
          ELSE
            rcofSqlWhere := rcofSqlWhere || ' AND (ae.property_collection.name = ' || quote_literal(rcof.pcname);
          END IF;
          IF rcof.comparator IN ('ILIKE', 'LIKE') THEN
            rcofSqlWhere := rcofSqlWhere || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal('%' || rcof.value || '%');
          ELSE
            rcofSqlWhere := rcofSqlWhere || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal(rcof.value);
          END IF;
          rcofSqlWhere := rcofSqlWhere || ')';
        END LOOP;
      END IF;

      IF cardinality(pco_filters) > 0 OR cardinality(rco_filters) > 0 THEN
        sql := sql || ' AND ae.object.id IN (' || pcofSql || ' WHERE (' || pcofSqlWhere || ')) OR ae.object.id IN (' || rcofSql || ' WHERE (' || rcofSqlWhere || ')) ';
      END IF;

    --RAISE EXCEPTION  'export_taxonomies: %, tax_filters: %, pco_filters: %, rco_filters: %, cardinality(pco_filters): %, sql: %:', export_taxonomies, tax_filters, pco_filters, rco_filters, cardinality(pco_filters), sql;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;

ALTER FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  OWNER TO postgres;
