with evab_arten as (
  select
    ae.object.id,
    (ae.object.properties->>'Artname vollständig')::text as "artname_vollstaendig",
    (ae.object.properties->>'Gattung')::text as "gattung",
    (ae.object.properties->>'Artname')::text as "artname",
    (ae.object.properties->>'Taxonomie ID')::integer as "taxonomie_id",
    ae.object.name,
    'Fauna'::text as "klasse"
  from
    ae.object
    inner join ae.taxonomy
    on ae.object.taxonomy_id = ae.taxonomy.id
    left join ae.property_collection_object
    on ae.object.id = ae.property_collection_object.object_id
      inner join ae.property_collection
      on ae.property_collection_object.property_collection_id = ae.property_collection.id
  where
    ae.taxonomy.name = 'CSCF (2009)'
    and ae.object.properties is not null
    and ae.property_collection.name = 'ZH GIS'
    and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
    and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
  UNION select
    ae.object.id,
    (ae.object.properties->>'Artname vollständig')::text as "artname_vollstaendig",
    (ae.object.properties->>'Gattung')::text as "gattung",
    (ae.object.properties->>'Artname')::text as "artname",
    (ae.object.properties->>'Taxonomie ID')::integer as "taxonomie_id",
    ae.object.name,
    'Flora'::text as "klasse"
  from
    ae.object
    inner join ae.taxonomy
    on ae.object.taxonomy_id = ae.taxonomy.id
    left join ae.evab_flora_status
    on ae.object.properties->>'Status' = ae.evab_flora_status.decoded
  where
    ae.taxonomy.name = 'SISF Index 2 (2005)'
    and ae.object.properties is not null
    and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
    and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
  UNION select
    ae.object.id,
    (ae.object.properties->>'Artname vollständig')::text as "artname_vollstaendig",
    (ae.object.properties->>'Gattung')::text as "gattung",
    (ae.object.properties->>'Artname')::text as "artname",
    (ae.object.properties->>'Taxonomie ID')::integer as "taxonomie_id",
    ae.object.name,
    'Moose'::text as "klasse"
  from
    ae.object
    inner join ae.taxonomy
    on ae.object.taxonomy_id = ae.taxonomy.id
  where
    ae.taxonomy.name = 'NISM (2010)'
    and ae.object.properties is not null
    and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
    and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
), evab_arten_namen_mehrfach as (
  select name, count(*) as count from evab_arten group by 1 having count(*) > 1
)
select id, name, properties from ae.object where id in (select id from evab_arten where name in (select name from evab_arten_namen_mehrfach)) order by name;


