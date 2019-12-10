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
-- 4. add extra fields
alter table ae.tmp_object add column id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc();
alter table ae.tmp_object add column properties jsonb DEFAULT NULL;
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
-- 6. insert data from tmp table into objects
insert into ae.object (id,taxonomy_id,name,properties)
select id,taxonomy_id,name,properties from ae.tmp_object;

-- TODO: add synonyms for all sisf2 objects with same taxonomie id
-- TODO: add synonyms for all synonyms of the same object in sisf2
-- TODO: add synonyms for all sisf2 fns-objects that are genus
-- TODO: add ZH GIS property_collection
-- TODO: drop ae.tmp_object
-- alter EvAB api:
--   deliver all from sisf3 with status a
--   deliver those from sisf3 with same taxonomie id in sisf2 with guid of sisf2 object
--   add all objects from sisf2 that do not have sisf3 with same taxonomie_id with other status
-- similar with alt api
-- get apis to work using zeit