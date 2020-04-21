
create or replace view ae.evab_arten as
-- Return these fields:
-- - idArt: MSAccess GUID, id
-- - nummer: TaxonomieID
-- - wissenschArtname:
--   - Artname.substring(0, 255)
--   -  or: Gattung + Art
--   2018-10-04: corrected to name field (= Artname vollständig)
-- - deutscherArtname: ['Name Deutsch'].substring(0, 255)
-- - status:
--   - Fauna: 'A'
--   - Moose: 'A'
--   - Flora: codiereFloraStatus(Status)
-- - klasse:
--   - Fauna: ZhGis.properties['GIS-Layer'].substring(0, 50)
--   - Flora: 'Flora'
--   - Moose: 'Moose'

-- Problem with new Taxonomy for Flora: 
-- SISF (2018) supersedes SISF (2005)
-- Most species existing in SISF (2005) also exist in SISF (2018), but with a new id. They are synonyms
-- Ideally EvAB users would now usually choose SISF (2018) species
-- In special cases (for instance when lists were created before SISF (2018) existed) they would still need to choose from SISF (2005)
-- There are two problems:
-- 1. EvAB does not have a concept of "taxonomy"
--    EvAB user will only see a single list of names 
--    and not known what taxonomy a name belongs to 
--    nor be able to choose what taxonomy to choose species from
--    In SISF (2018) names of synonyms existing in SISF (2005) are naturally very similar, often exactly same
--    We need to pass them only once or user will not know which to choose
-- 2. EvAB needs to have all idArt's ever (possibly) choosen in the list
--    If an idArt that was delivered previously is not delivered any more, user will not see the specie's name
--    Likely even worse will happen
-- Solution:
-- 1. pass SISF (2018) with the id of their SISF (2005) synonym if one exists (it usually will)
-- 2. build a list of all id's passed as SISF (2018)
-- 3. use this list to prevent from passing the same ones as SISF (2005) a second time
--    but _do_ pass all species from SISF (2005) that are not synonyms of species in SISF (2018)
-- This is of course not a good solution. We probably do not know yet all the problems that will develop as a consequence
-- It is untenable in the long run, with new generations of taxonomies in all groups. And so it prevents us from updating taxonomies
-- But it is the only way it will work in EvAB as of now (2020)
with sisf_2_3_synonyms as (
  -- this is the list of synonyms for SISF (2018) in SISF (2005)
  -- to enable passing id of SISF (2005) as id of SISF (2018)
  select
    o1.id as sisf2_id,
    o2.id as sisf3_id
  from
    ae.synonym
    inner join ae.object o1
    on ae.synonym.object_id = o1.id
    inner join ae.object o2
    on ae.synonym.object_id_synonym = o2.id
  where
    o1.taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4' -- index2
    and o2.taxonomy_id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6' -- index3
),
sisf_3_id_art as (
  -- this is the list of all ids already passed as SISF (2018)
  select
    ae.object.id,
    coalesce (sisf_2_3_synonyms.sisf2_id, ae.object.id) as id_art
  from
    ae.object
    left join sisf_2_3_synonyms
    on sisf_2_3_synonyms.sisf3_id = ae.object.id
    inner join ae.taxonomy
    on ae.object.taxonomy_id = ae.taxonomy.id
  where
    ae.taxonomy.id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6' -- SISF (2018)
    and ae.object.properties is not null
    and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
    and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
)
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
  -- but use guid of synonym SISF (2005) if a synonym exists
  concat('{', upper(coalesce (sisf_2_3_synonyms.sisf2_id, ae.object.id)::TEXT), '}') as "idArt",
  (ae.object.properties->>'Taxonomie ID')::integer as "nummer",
  substring(ae.object.name, 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  'A' as status,
  'Flora'::text as "klasse"
from
  ae.object
  left join sisf_2_3_synonyms
  on sisf_2_3_synonyms.sisf3_id = ae.object.id
  inner join ae.taxonomy
  on ae.object.taxonomy_id = ae.taxonomy.id
where
  ae.taxonomy.id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6' -- SISF (2018)
  and ae.object.properties is not null
  and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
  and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
-- Flora: species of SISF (2005) 
-- IMPORTANT: ony those whose id has not been included in SISF (2018)
-- because they are synonym
UNION select
  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
  (ae.object.properties->>'Taxonomie ID')::integer as "nummer",
  substring(ae.object.name, 1, 255) as "wissenschArtname",
  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "deutscherArtname",
  '?' as status,
  'Flora'::text as "klasse"
from
  ae.object
  inner join ae.taxonomy
  on ae.object.taxonomy_id = ae.taxonomy.id
where
  ae.taxonomy.id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4' -- SISF (2005)
  and ae.object.properties is not null
  and ae.object.properties->>'Taxonomie ID' ~ E'^\\d+$'
  and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
  -- ensure this object i.e. it's id was not passed with SISF (2018)
  and ae.object.id not in (select id_art from sisf_3_id_art)
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