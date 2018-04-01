

create or replace view ae.taxonomy_writers as
select distinct ae.user.name
from
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.organization_user.role in ('orgTaxonomyWriter', 'orgAdmin');
  
create or replace view ae.current_user_writable_taxonomies as
select distinct ae.taxonomy.id
from ae.taxonomy
where ae.taxonomy.id in (
	select distinct ae.taxonomy.id
	from ae.taxonomy
    inner join ae.organization_user
      inner join ae.user
      on ae.user.id = ae.organization_user.user_id
    on ae.organization_user.organization_id = ae.taxonomy.organization_id
	where
    ae.user.name = current_user_name()
    and ae.organization_user.role in ('orgTaxonomyWriter', 'orgAdmin')
	)
  or
  (
    ae.taxonomy.id in (
      select taxonomy.id from ae.taxonomy where organization_id is null
    )
    AND current_user_name() IN (SELECT * FROM ae.taxonomy_writers)
  );

create or replace view ae.organizations_currentuser_is_taxonomywriter as
select distinct ae.organization_user.organization_id
FROM
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgTaxonomyWriter', 'orgAdmin');

create or replace view ae.organization_admins as
select distinct ae.user.name
from
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.organization_user.role in ('orgAdmin');

create or replace view ae.collection_writers as
select distinct ae.user.name
from
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.organization_user.role in ('orgCollectionWriter', 'orgAdmin');

create or replace view ae.organizations_currentuser_is_collectionwriter as
select distinct ae.organization_user.organization_id
FROM
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgCollectionWriter', 'orgAdmin');

create or replace view ae.organizations_currentuser_is_orgadmin as
select distinct ae.organization_user.organization_id
FROM
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgAdmin');

create or replace view ae.current_user_writable_collections as
select distinct ae.property_collection.id
from  
  ae.property_collection
  inner join ae.organization_user
    inner join ae.user
    on ae.user.id = ae.organization_user.user_id
  on ae.organization_user.organization_id = ae.property_collection.organization_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgCollectionWriter', 'orgAdmin');

create or replace view ae.evab_arten as
select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  ae.object.properties->>'Taxonomie ID' as "nummer",
  substring(COALESCE(ae.object.properties->>'Artname', concat(ae.object.properties->>'Gattung', ' ', ae.object.properties->>'Art')), 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  'A'::text as status,
  substring(ae.property_collection_object.properties->>'GIS-Layer', 1, 50) as "klasse"
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
UNION select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  ae.object.properties->>'Taxonomie ID' as "nummer",
  substring(COALESCE(ae.object.properties->>'Artname', concat(ae.object.properties->>'Gattung', ' ', ae.object.properties->>'Art')), 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  ae.evab_flora_status.encoded as status,
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
UNION select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  ae.object.properties->>'Taxonomie ID' as "nummer",
  substring(COALESCE(ae.object.properties->>'Artname', concat(ae.object.properties->>'Gattung', ' ', ae.object.properties->>'Art')), 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  'A'::text as status,
  'Moose'::text as "klasse"
from
  ae.object
  inner join ae.taxonomy
  on ae.object.taxonomy_id = ae.taxonomy.id
where
  ae.taxonomy.name = 'NISM (2010)'
  and ae.object.properties is not null;