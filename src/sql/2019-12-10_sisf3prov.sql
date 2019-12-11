-- 1. prepare data to import
--    combining data from both files from info flora
-- 2. create new taxonomy
CREATE TABLE ae.tmp_object (
  taxonomy_id UUID NOT NULL REFERENCES ae.taxonomy (id) ON DELETE CASCADE ON UPDATE CASCADE,
  name text default null,
  tax_id_intern integer default null,
  tax_id integer default null,
  quelle text default null,
  rangstufe text default null,
  rangstufe_decodiert text default null,
  familie text default null,
  indigenat_ch text default null,
  indigenat_ch_decodiert text default null,
  grenzgebiet text default null,
  ist_teil_von integer default null
);
-- 3. import data (importdata.csv)
-- 3.1 simplify
update ae.tmp_object
set quelle = 'Gattung'
where quelle = 'Gattung / genre';
update ae.tmp_object
set quelle = 'Familie'
where quelle = 'Familie / famille';
-- 4. add extra fields
alter table ae.tmp_object add column id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc();
alter table ae.tmp_object add column properties jsonb DEFAULT NULL;
alter table ae.tmp_object add column parent_id UUID DEFAULT NULL;
-- 5. set properties
update ae.tmp_object set properties = json_build_object(
  'Taxonomie ID intern', tax_id_intern,
  'Taxonomie ID', tax_id,
  'Taxon ID VDC', 'infospecies.ch:infoflora:' || tax_id,
  'Artname vollständig', name,
  'Quelle', quelle,
  'Rangstufe', rangstufe,
  'Rangstufe decodiert', rangstufe_decodiert,
  'Familie', familie,
  'Indigenat CH', indigenat_ch,
  'Indigenat CH decodiert', indigenat_ch_decodiert,
  'Grenzgebiet', grenzgebiet,
  'Ist Teil von: Taxonomie ID', ist_teil_von
);
-- 6. build hierarchy
-- 6.1 ist teil von
update ae.tmp_object
set parent_id = teile_von.parent_id
from (
  select
    o1.id,
    o2.id as parent_id 
  from ae.tmp_object o1
  inner join ae.tmp_object o2
  on o2.tax_id = o1.ist_teil_von
  where o1.ist_teil_von is not null
) as teile_von
where ae.tmp_object.id = teile_von.id;

-- 6.2 other quelle = Checklist 2017
-- NOPE: data is not consistent. See gen Aster vs. Aster alpinis for example
/*update ae.tmp_object
set parent_id = checklist.parent_id
from (
  select
    id,
    (
      select id
      from ae.tmp_object o1
      where
        o1.tax_id_intern < ae.tmp_object.tax_id_intern
        and o1.quelle = 'Gattung'
      order by
        o1.tax_id_intern desc
      limit 1
    ) as parent_id
  from 
    ae.tmp_object
  where 
    parent_id is null
    and quelle = 'Checklist 2017'
) as checklist
where ae.tmp_object.id = checklist.id;*/


-- 6.3 Familie and Gattung are numbered wildly. So cannot connect to them > delete them
delete from ae.tmp_object WHERE quelle = 'Gattung';
delete from ae.tmp_object WHERE quelle = 'Familie';

-- empty objects of this taxonomy (just in case...)
delete from ae.object where taxonomy_id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6';

-- 7. insert data from tmp table into objects
insert into ae.object (id,taxonomy_id,name,properties,parent_id)
select id,taxonomy_id,name,properties,parent_id from ae.tmp_object;

-- 8. TODO: add synonyms for all sisf2 objects according to SISF2_vs_Checklist2017
-- 8.1 create tmp_synonym
CREATE TABLE ae.tmp_synonym (
  sisf2_nr integer default null,
  tax_id_intern integer default null
);
-- 8.2 import the data into tmp_synonym
-- 8.3 add synonyms both ways
-- aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4: index2,
-- c87f19f2-1b77-11ea-8282-bbc40e20aff6: index3
insert into ae.synonym(object_id, object_id_synonym)
select
  o_index_2.id as object_id,
  o_index_3.id as object_id_synonym
from
  ae.tmp_synonym s
  inner join ae.object o_index_2
  on (o_index_2.properties->>'Taxonomie ID')::int = s.sisf2_nr and o_index_2.taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4'
  inner join ae.object o_index_3
  on (o_index_3.properties->>'Taxonomie ID intern')::int = s.tax_id_intern and o_index_3.taxonomy_id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6'
union all
select
  o_index_3.id as object_id,
  o_index_2.id as object_id_synonym
from
  ae.tmp_synonym s
  inner join ae.object o_index_2
  on (o_index_2.properties->>'Taxonomie ID')::int = s.sisf2_nr and o_index_2.taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4'
  inner join ae.object o_index_3
  on (o_index_3.properties->>'Taxonomie ID intern')::int = s.tax_id_intern and o_index_3.taxonomy_id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6';

-- TODO: add synonyms for all synonyms of the same object in sisf2
-- do not forget: both ways
insert into ae.synonym(object_id, object_id_synonym)
select * from (
  with sisf2_synonyms as (
    select
      o1.id as sisf_2_object_id,
      o2.id as sisf_2_object_id_synonym
    from
      ae.synonym
      inner join ae.object o1
      on ae.synonym.object_id = o1.id
      inner join ae.object o2
      on ae.synonym.object_id_synonym = o2.id
    where
      o1.taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4' -- index2
      and o2.taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4' -- index2
  ), sisf_2_3_synonyms as (
    select
      o1.id as sisf_2_object_id,
      o2.id as sisf_3_object_id_synonym
    from
      ae.synonym
      inner join ae.object o1
      on ae.synonym.object_id = o1.id
      inner join ae.object o2
      on ae.synonym.object_id_synonym = o2.id
    where
      o1.taxonomy_id = 'aed47d41-7b0e-11e8-b9a5-bd4f79edbcc4' -- index2
      and o2.taxonomy_id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6' -- index3
  )
  select
    sisf2_synonyms.sisf_2_object_id as object_id,
    sisf_2_3_synonyms.sisf_3_object_id_synonym as object_id_synonym
  from
    sisf2_synonyms
    inner join sisf_2_3_synonyms
    on sisf_2_3_synonyms.sisf_2_object_id = sisf2_synonyms.sisf_2_object_id_synonym;
)

-- TODO: add ZH GIS property_collection for all objects
insert into ae.property_collection_object (object_id,property_collection_id,properties)
select
  id as object_id, 
  'bdf7a9fa-7b0e-11e8-a16c-efe328566112' as property_collection_id,
  '{
      "GIS-Layer": "Flora",
      "Betrachtungsdistanz (m)": 500,
      "Kriterien für Bestimmung der Betrachtungsdistanz": "500m als Minimalwert zugeteilt"
  }' as properties
from ae.object where taxonomy_id = 'c87f19f2-1b77-11ea-8282-bbc40e20aff6'
-- TODO: drop ae.tmp_object
-- TODO: drop ae.tmp_synonym
-- alter EvAB api:
--   deliver all from sisf3 with status a
--   deliver those from sisf3 with same taxonomie id in sisf2 with guid of sisf2 object
--   add all objects from sisf2 that do not have sisf3 with same taxonomie_id with other status
-- similar with alt api
-- get apis to work using zeit