

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

-- original of this view is in: 2020-04-25_evab_arten.sql
create or replace view ae.evab_arten as
-- Return these fields:
-- - idArt: MSAccess GUID, id
-- - nummer: TaxonomieID
--   2020-04-25: used to have to be unique per klasse. not any more!
-- - wissenschArtname:
--   - Artname.substring(0, 255)
--   taken from name field (= Artname vollständig)
-- - deutscherArtname: ['Name Deutsch'].substring(0, 255)
-- - status:
--   - Fauna: 'A'
--   - Moose: 'A'
--   - Flora: codiereFloraStatus(Status)
--     2020-04-25: from now on:
--     1. sisf (2005) as '?' or what?
--     2. sisf (2018) as 'A'
-- - klasse:
--   - Fauna: ZhGis.properties['GIS-Layer'].substring(0, 50)
--   - Flora: 'Flora'
--   - Moose: 'Moose'

-- Problem with new Taxonomy for Flora: 
-- SISF (2018) supersedes SISF (2005)
-- Most species existing in SISF (2005) also exist in SISF (2018), but with a new id. They are synonyms
-- Ideally EvAB users would from now on usually choose SISF (2018) species
-- 
-- Species they choose earlier should still exist in the list because:
-- 1. In special cases (for instance when lists were created before SISF (2018) existed) they would still need to choose from SISF (2005)
-- 2. In existing Data species names should still show
-- The problem is: EvAB does not have a concept of "taxonomy"
-- In SISF (2018) names of synonyms existing in SISF (2005) are naturally very similar, often exactly same
-- In the dropdonw list taxonomies should normally not be mixed or user will not know which of same or similar names to choose
-- Solution:
-- 1. pass SISF (2018) with status 'A'
-- 2. pass SISF (2005) with status '?'
-- EvAB in standard settings only includes species with status 'A'. So when choosing a species a user will usually use the new Taxonomy.
-- In existing data names are also shown if species has name with other status.
-- If the user specifically wants to choose a species from SISF (2005) he/she can set options to list all species. 
-- Which will not be a great experience as the taxonomy name is not visible. But should be rare and in most cases feasible

-- Fauna
select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  (ae.object.properties->>'Taxonomie ID')::integer as "nummer",
  substring(ae.object.name, 1, 255) as "wissenschArtname",
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
  and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
  and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
-- Flora: 1. all species of SISF (2018)
UNION select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  (ae.object.properties->>'Taxonomie ID')::integer as "nummer",
  substring(ae.object.name, 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  'A' as status,
  'Flora'::text as "klasse"
from
  ae.object
where
  ae.object.taxonomy_id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6' -- SISF (2018)
  and ae.object.properties is not null
  and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
  and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
-- Flora: species of SISF (2005) 
UNION select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  (ae.object.properties->>'Taxonomie ID')::integer as "nummer",
  substring(ae.object.name, 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  -- Give them status that is not aktuell
  '?' as status,
  'Flora'::text as "klasse"
from
  ae.object
where
  ae.object.taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4' -- SISF (2005)
  and ae.object.properties is not null
  and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
  and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
-- Moose
UNION select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  (ae.object.properties->>'Taxonomie ID')::integer as "nummer",
  substring(ae.object.name, 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  'A'::text as status,
  'Moose'::text as "klasse"
from
  ae.object
  inner join ae.taxonomy
  on ae.object.taxonomy_id = ae.taxonomy.id
where
  ae.taxonomy.name = 'NISM (2010)'
  and ae.object.properties is not null
  and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
  and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647;





create or replace view ae.alt_standard as
select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  (ae.object.properties->>'Taxonomie ID')::integer as "ref",
  substring(ae.property_collection_object.properties->>'GIS-Layer', 1, 50) as "gisLayer",
  (ae.property_collection_object.properties->>'Betrachtungsdistanz (m)')::integer AS "distance",
  substring(COALESCE(ae.object.properties->>'Artname', concat(ae.object.properties->>'Gattung', ' ', ae.object.properties->>'Art'), '(kein Artname)'), 1, 255) as "nameLat",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "nameDeu",
  CASE
    WHEN EXISTS(
      SELECT
        ae.property_collection_object.properties->>'Artwert'
      FROM
        ae.property_collection_object
        inner join ae.property_collection
        on ae.property_collection_object.property_collection_id = ae.property_collection.id
      WHERE
        ae.property_collection_object.object_id = ae.object.id
        and ae.property_collection.name = 'ZH Artwert (aktuell)'
        -- make sure Artwert can be cast to integer
        -- there exist values like this: 14?
        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\d+$'
        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
    ) THEN (
      SELECT
        (ae.property_collection_object.properties->>'Artwert')::int
      FROM
        ae.property_collection_object
        inner join ae.property_collection
        on ae.property_collection_object.property_collection_id = ae.property_collection.id
      WHERE
        ae.property_collection_object.object_id = ae.object.id
        and ae.property_collection.name = 'ZH Artwert (aktuell)'
        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\d+$'
        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
      LIMIT 1
    )
    WHEN EXISTS(
      SELECT
        ae.property_collection_object.properties->>'Artwert'
      FROM
        ae.property_collection_object
        inner join ae.property_collection
        on ae.property_collection_object.property_collection_id = ae.property_collection.id
      WHERE
        ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
        and ae.property_collection.name = 'ZH Artwert (aktuell)'
        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\d+$'
        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
    ) THEN (
      SELECT
        (ae.property_collection_object.properties->>'Artwert')::int
      FROM
        ae.property_collection_object
        inner join ae.property_collection
        on ae.property_collection_object.property_collection_id = ae.property_collection.id
      WHERE
        ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
        and ae.property_collection.name = 'ZH Artwert (aktuell)'
        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\d+$'
        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
      LIMIT 1
    )
    ELSE 0
  END AS "artwert"
from
  ae.object
  inner join ae.taxonomy
  on ae.object.taxonomy_id = ae.taxonomy.id
    inner join ae.property_collection_object
    on ae.property_collection_object.object_id = ae.object.id
      inner join ae.property_collection
      on ae.property_collection_object.property_collection_id = ae.property_collection.id
where
  ae.taxonomy.id in('aed47d40-7b0e-11e8-b9a5-bd4f79edbcc4', 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4', 'c87f19f2-1b77-11ea-8282-bbc40e20aff6')
  -- removes all structural nodes not included in sisf2
  and ae.object.properties is not null
  and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
  and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
  -- beware: every object needs an entry in ZH GIS...
  and ae.property_collection.name = 'ZH GIS'
  -- ...with GIS-Layer and Betrachtungsdistanz!
  and ae.property_collection_object.properties->>'GIS-Layer' is not null
  and ae.property_collection_object.properties->>'Betrachtungsdistanz (m)' ~ E'^\\d+$'
  and (ae.property_collection_object.properties->>'Betrachtungsdistanz (m)')::integer < 2147483647;

  

-- view for vermehrung.apflora.ch
DROP VIEW IF EXISTS ae.v_vermehrung_arten CASCADE;
CREATE OR REPLACE VIEW ae.v_vermehrung_arten AS
select
  id,
  name,
  properties->>'Artname' as name_latein,
  case
    when properties->>'Name Deutsch' is not null then properties->>'Name Deutsch'
    else properties->>'Artname'
  end as name_deutsch
from ae.object
where
  taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4'
  and properties->>'Artname' is not null
order by name;

-- view for apflora.ch
drop view if exist ae.v_apflora_lr_delarze cascade;
create or replace view ae.v_apflora_lr_delarze as
select 
  id,
  properties->>'Label' as label,
  properties->>'Einheit' as einheit,
  name from ae.object
where
  taxonomy_id = '69d34753-445b-4c55-b3b7-e570f7dc1819'
order by
  label;

drop view if exists ae.v_apflora_taxonomies cascade;
create or replace view ae.v_apflora_taxonomies as
with objartwert as (
	select * from ae.property_collection_object
	where property_collection_id = 'bdf89414-7b0e-11e8-a170-ab93aeea0aac'
)
select distinct
  tax.id as taxonomie_id,
  tax.name as taxonomie_name,
	ae.object.id, 
	cast(ae.object.properties->>'Taxonomie ID' as INTEGER) as taxid,
	ae.object.properties->>'Familie' as familie,
	ae.object.name as artname,
	ae.object.properties->>'Status' as status,
  coalesce(
    cast(objartwert.properties->>'Artwert' as INTEGER),
    cast(synobjartwert.properties->>'Artwert' as INTEGER),
    cast(synobjartwert2.properties->>'Artwert' as INTEGER)
  ) as artwert
from ae.object
  inner join ae.taxonomy tax on tax.id = ae.object.taxonomy_id
  left join ae.synonym synonym 
    inner join objartwert synobjartwert on synobjartwert.object_id = synonym.object_id_synonym
  on ae.object.id = synonym.object_id
  -- account for both ways an object can be defined as synonym
  left join ae.synonym synonym2 
    inner join objartwert synobjartwert2 on synobjartwert2.object_id = synonym2.object_id_synonym
  on ae.object.id = synonym2.object_id_synonym
  left join objartwert on objartwert.object_id = ae.object.id
where
  -- sisf index 2
  taxonomy_id in ('aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4')
  -- only lowest hierarchy, not pure structural objects
  and ae.object.properties->>'Taxonomie ID' is not null
order by
  tax.name,
  ae.object.name;