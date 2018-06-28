select
  ae.object.id
from
  ae.object
  inner join ae.taxonomy
  on ae.taxonomy.id = ae.object.taxonomy_id
where
  -- 1. apply taxonomy filter:
  ae.taxonomy.name = any($1)
  -- 2. if exists: apply tax fields filter:
  and ???
  -- 3. if exists: apply pco fields filter:
  -- to all objects of 
