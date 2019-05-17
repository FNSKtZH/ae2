-- some id vdc seem to be null
select properties ->> 'Taxonomie ID'
from ae.object
where 
  properties ->> 'Klasse' = 'Aves'
  and properties ->> 'Taxon ID VDC' is null;
-- but all are added by FNS


-- do not include species added by FNS
select properties ->> 'Taxon ID VDC'
from ae.object
where 
  properties ->> 'Klasse' = 'Aves'
  and cast(properties ->> 'Taxonomie ID' as integer) < 1000000;

-- working query
-- see: https://stackoverflow.com/a/6258586/712005 (update using subquery)
-- and: https://stackoverflow.com/a/35349699/712005 (update jsonb)
-- and: https://stackoverflow.com/a/41902482/712005 (concat jsonb)
update ae.object
set properties = jsonb_set(properties, '{"Taxon ID VDC"}', concat('"infospecies.ch:vogelwarte:', properties ->> 'Taxonomie ID', '"')::jsonb)
from (
  select id, properties ->> 'Taxon ID VDC'
  from ae.object
  where 
    properties ->> 'Klasse' = 'Aves'
    and cast(properties ->> 'Taxonomie ID' as integer) < 1000000
) as subquery
where ae.object.id = subquery.id;