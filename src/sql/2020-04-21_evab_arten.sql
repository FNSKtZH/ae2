
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
with 
-- need a list of synonyms for SISF (2018) in SISF (2005)
-- to enable passing id of SISF (2005) as id of SISF (2018)
sisf_2_3_synonyms as (
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
-- 2020: Problem with new Taxonomy for Flora: 
-- SISF (2018) will supersede SISF (2005). 
-- Ideally EvAB users would now only choose SISF (2018) species.
-- Most species existing in SISF (2005) also exist in SISF (2018), but with new id's
-- There are two problems:
-- 1. EvAB does not have a concept of "taxonomy"
--    EvAB user will only see a single list of names 
--    and not known what taxonomy a name belongs to 
--    nor be able to choose what taxonomy to choose species from
--    In SISF (2018) names of synonyms existing in SISF (2005) are naturally very similar, often exactly same
--    We need to pass them only once or user will not know which to choose
-- 2. EvAB needs to have all idArt's ever choosen in the list
--    If an idArt that was delivered previously is not delivered any more, user will not see the species name. Quite likely even worse will happen
--    So whenever a species in SISF (2018) has a synonym in SISF (2005) (which will be most) we need to pass the id of SISF (2005)
-- Solution: 
-- need a list of all id's passed as SISF (2018)
-- to prevent from passing the same ones as SISF (2005) a second time
-- This is of course not a good solution. We probably do not know yet all the problems that will develop as a consequence. 
-- It is untenable in the long run, with new generations of taxonomies in all groups. 
-- But it is the only way it will work in EvAB as of now
sisf_3_id_art as (
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
-- pass all species of SISF (2018)
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
-- pass species of SISF (2005) 
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