SELECT
    ae.relation.*
FROM
    ae.object
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
            ae.taxonomy.name IN ('export_taxonomies')
            AND ae.object.properties->>'pname' 'comparator' '%value%'
    )
    AND (
        ae.property_collection.name IN ('pcname')
        AND ae.relation.properties->>'pname' 'comparator' '%value%'
    );

-- example:
SELECT
    ae.relation.*
FROM
    ae.object
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
            ae.taxonomy.name IN ('SISF Index 2 (2005)')
            --AND ae.object.properties->>'Gattung' ILIKE '%Achillea%'
    )
    AND (
        ae.property_collection.name IN ('ZH AP FM (2010)')
        AND ae.relation.properties->>'Biotopbindung' > '0'
    );

