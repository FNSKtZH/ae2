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
-- import data
alter table ae.tmp_object add column id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc();
alter table ae.tmp_object add column properties jsonb DEFAULT NULL;

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

insert into ae.object (id,taxonomy_id,name,properties)
select id,taxonomy_id,name,properties from ae.tmp_object;

-- TODO: add synonyms for all sisf2 objects with same taxonomie id
-- TODO: add synonyms for all sisf2 fns-objects that are genus
-- TODO: add ZH GIS property_collection