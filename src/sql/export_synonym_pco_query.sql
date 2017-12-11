SELECT
    ae.property_collection_object.*
FROM
    ae.object
    INNER JOIN ae.property_collection_object
        INNER JOIN ae.property_collection
        ON ae.property_collection_object.property_collection_id = ae.property_collection.id
    ON ae.object.id = ae.property_collection_object.object_id
WHERE
    ae.object.id IN (
        SELECT
            ae.object.*
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
                    ae.taxonomy.name = ANY('export_taxonomies')
                    AND ae.object.properties->>'pname' 'comparator' '%value%'
            )
    )
    AND (
        ae.property_collection.name = 'pcname'
        AND ae.property_collection_object.properties->>'pname' 'comparator' '%value%'
    );

-- example:
SELECT
    ae.property_collection_object.*
FROM
    ae.object
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
            ae.taxonomy.name = ANY('SISF Index 2 (2005)')
            AND ae.object.properties->>'Gattung' ILIKE '%Achillea%'
    )
    AND (
        ae.property_collection.name = 'CH Rote Liste (aktuell)'
        AND ae.property_collection_object.properties->>'Schweiz (uncodiert)' ILIKE '%nicht gefährdet%'
    );

