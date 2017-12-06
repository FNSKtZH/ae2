WITH
    -- objects coming from pco
    -- objects coming from relation
SELECT
    ae.taxonomy.name AS taxonomy_name,
    ae.object.name AS object_name,
    ae.object.properties->>'Gattung' AS regexp_replace(concat_ws('_', ae.taxonomy.name::text, 'Gattung'), '\s', '-'),
    ae.property_collection_object.id AS pc_id
FROM
    ae.object
    INNER JOIN ae.taxonomy
    ON ae.object.taxonomy_id = ae.taxonomy.id
    INNER JOIN ae.property_collection_object
        INNER JOIN ae.property_collection
        ON ae.property_collection_object.property_collection_id = ae.property_collection.id
    ON ae.object.id = ae.property_collection_object.object_id
WHERE
    ae.object.properties->>'Gattung' ILIKE '%rosa%'


