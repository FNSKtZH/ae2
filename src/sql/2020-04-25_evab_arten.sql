
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