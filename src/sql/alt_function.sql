-- THIS FUNCTION IS NOT IN USE
CREATE OR REPLACE FUNCTION ae.alt_fields(fields collection_property[])
  RETURNS setof ae.relation AS
  $$
    DECLARE
      rcop rco_property;
      sql text := 'select
                    concat(''{'', upper(ae.object.id::TEXT), ''}'') as "idArt",
                    (ae.object.properties->>''Taxonomie ID'')::integer as "ref",
                    substring(ae.property_collection_object.properties->>''GIS-Layer'', 1, 50) as "gisLayer",
                    (ae.property_collection_object.properties->>''Betrachtungsdistanz (m)'')::integer AS "distance",
                    substring(COALESCE(ae.object.properties->>''Artname'', concat(ae.object.properties->>''Gattung'', '' '', ae.object.properties->>''Art''), ''(kein Artname)''), 1, 255) as "nameLat",
                    substring(ae.object.properties->>''Name Deutsch'', 1, 255) as "nameDeu",
                    CASE
                      WHEN EXISTS(
                        SELECT
                          ae.property_collection_object.properties->>''Artwert''
                        FROM
                          ae.property_collection_object
                          inner join ae.property_collection
                          on ae.property_collection_object.property_collection_id = ae.property_collection.id
                        WHERE
                          ae.property_collection_object.object_id = ae.object.id
                          and ae.property_collection.name = ''ZH Artwert (aktuell)''
                          -- make sure Artwert can be cast to integer
                          -- there exist values like this: 14?
                          and ae.property_collection_object.properties->>''Artwert'' ~ E''^\\d+$''
                          and (ae.property_collection_object.properties->>''Artwert'')::integer < 2147483647
                      ) THEN (
                        SELECT
                          (ae.property_collection_object.properties->>''Artwert'')::int
                        FROM
                          ae.property_collection_object
                          inner join ae.property_collection
                          on ae.property_collection_object.property_collection_id = ae.property_collection.id
                        WHERE
                          ae.property_collection_object.object_id = ae.object.id
                          and ae.property_collection.name = ''ZH Artwert (aktuell)''
                          and ae.property_collection_object.properties->>''Artwert'' ~ E''^\\d+$''
                          and (ae.property_collection_object.properties->>''Artwert'')::integer < 2147483647
                        LIMIT 1
                      )
                      WHEN EXISTS(
                        SELECT
                          ae.property_collection_object.properties->>''Artwert''
                        FROM
                          ae.property_collection_object
                          inner join ae.property_collection
                          on ae.property_collection_object.property_collection_id = ae.property_collection.id
                        WHERE
                          ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                          and ae.property_collection.name = ''ZH Artwert (aktuell)''
                          and ae.property_collection_object.properties->>''Artwert'' ~ E''^\\d+$''
                          and (ae.property_collection_object.properties->>''Artwert'')::integer < 2147483647
                      ) THEN (
                        SELECT
                          (ae.property_collection_object.properties->>''Artwert'')::int
                        FROM
                          ae.property_collection_object
                          inner join ae.property_collection
                          on ae.property_collection_object.property_collection_id = ae.property_collection.id
                        WHERE
                          ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                          and ae.property_collection.name = ''ZH Artwert (aktuell)''
                          and ae.property_collection_object.properties->>''Artwert'' ~ E''^\\d+$''
                          and (ae.property_collection_object.properties->>''Artwert'')::integer < 2147483647
                        LIMIT 1
                      )
                      ELSE 0
                    END AS "artwert"';
    BEGIN
      IF cardinality(fields) = 0 THEN
        sql := sql || 'false';
      ELSE
        FOREACH collection_property IN ARRAY fields
          LOOP
          -- TODO
          -- check collection_property.ctype
          -- add sql depending on this type
          IF collection_property.ctype = 'pco' THEN
            sql := sql || ',CASE
                              WHEN EXISTS(
                                SELECT
                                  ae.property_collection_object.properties->>'' || quote_literal(collection_property.property) || ''
                                FROM
                                  ae.property_collection_object
                                  inner join ae.property_collection
                                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                                WHERE
                                  ae.property_collection_object.object_id = ae.object.id
                                  and ae.property_collection.name = '' || quote_literal(collection_property.cname) || ''
                              ) THEN (
                                SELECT
                                  ae.property_collection_object.properties->>'' || quote_literal(collection_property.property) || ''
                                FROM
                                  ae.property_collection_object
                                  inner join ae.property_collection
                                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                                WHERE
                                  ae.property_collection_object.object_id = ae.object.id
                                  and ae.property_collection.name = '' || quote_literal(collection_property.cname) || ''
                                LIMIT 1
                              )
                              WHEN EXISTS(
                                SELECT
                                  ae.property_collection_object.properties->>'' || quote_literal(collection_property.property) || ''
                                FROM
                                  ae.property_collection_object
                                  inner join ae.property_collection
                                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                                WHERE
                                  ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                                  and ae.property_collection.name = '' || quote_literal(collection_property.cname) || ''
                              ) THEN (
                                SELECT
                                  ae.property_collection_object.properties->>'' || quote_literal(collection_property.property) || ''
                                FROM
                                  ae.property_collection_object
                                  inner join ae.property_collection
                                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                                WHERE
                                  ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                                  and ae.property_collection.name = '' || quote_literal(collection_property.cname) || ''
                                LIMIT 1
                              )
                              ELSE null
                            END AS "'' || collection_property.property || ''"';
          ELSE
            sql := sql || 'TODO';
          END IF;
        END LOOP;
      END IF;
      sql := sql || 'from
                      ae.object
                      inner join ae.taxonomy
                      on ae.object.taxonomy_id = ae.taxonomy.id
                        inner join ae.property_collection_object
                        on ae.property_collection_object.object_id = ae.object.id
                          inner join ae.property_collection
                          on ae.property_collection_object.property_collection_id = ae.property_collection.id
                    where
                      ae.taxonomy.name in(''CSCF (2009)'', ''SISF Index 2 (2005)'')
                      and ae.object.properties is not null
                      and ae.object.properties->>''Taxonomie ID'' ~ E''^\\d+$''
                      and (ae.object.properties->>''Taxonomie ID'')::integer < 2147483647
                      and ae.property_collection.name = ''ZH GIS''
                      and ae.property_collection_object.properties->>''GIS-Layer'' is not null
                      and ae.property_collection_object.properties->>''Betrachtungsdistanz (m)'' ~ E''^\\d+$''
                      and (ae.property_collection_object.properties->>''Betrachtungsdistanz (m)'')::integer < 2147483647';
    RETURN QUERY EXECUTE sql USING fields;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.alt_fields(fields collection_property[])
  OWNER TO postgres;