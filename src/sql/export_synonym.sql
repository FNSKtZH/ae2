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
            ae.taxonomy.name IN ('export_taxonomies')
            AND ae.object.properties->>'pName' 'comparator' '%value%'
    );

-- example:
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
            ae.taxonomy.name IN ('SISF Index 2 (2005)')
            AND ae.object.properties->>'Gattung' ILIKE '%Achillea%'
    );


