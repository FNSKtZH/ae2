-- Aves do not use 'Taxonomie ID' for 'Taxon ID VDC'. They use EURING instead!

-- 1. remove Taxon ID VDC for all Aves
update ae.object
set properties = properties - 'Taxon ID VDC'
where properties ->> 'Klasse' = 'Aves';

-- 2. set new value
update ae.object
set properties = jsonb_set(properties, '{"Taxon ID VDC"}', concat('"infospecies.ch:vogelwarte:', properties ->> 'EURING', '"')::jsonb)
where 
  properties ->> 'Klasse' = 'Aves'
  and cast(properties ->> 'Taxonomie ID' as integer) < 1000000
  and properties ->> 'EURING' is not null;