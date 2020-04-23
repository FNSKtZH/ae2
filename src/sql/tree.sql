with
tree_categories as (
  select id, name, null::UUID as parent_id, 1::bigint recursion_level
  from ae.tree_category
),
taxonomies as (
  select id, name, tree_category as parent_id, 2::bigint recursion_level
  from ae.taxonomy
),
art_objects as (
  with recursive a as (
    select ae.object.id, ae.object.name, ae.object.parent_id, 3::bigint recursion_level
    from ae.object
    inner join ae.taxonomy
    on ae.object.taxonomy_id = ae.taxonomy.id
    where 
      ae.object.parent_id is null
      and ae.taxonomy.type = 'Art'
    union all
    select o.id, o.name, o.parent_id, a.recursion_level +1
    from ae.object o
      inner join ae.taxonomy
      on o.taxonomy_id = ae.taxonomy.id
    join a on a.id = o.parent_id
    where 
      ae.taxonomy.type = 'Art'
      and a.recursion_level <= 10
  )
  select id, name, parent_id, recursion_level
  from a
),
lr_objects as (
  with recursive a as (
    select ae.object.id, ae.object.name, ae.object.parent_id, 3::bigint recursion_level
    from ae.object
    inner join ae.taxonomy
    on ae.object.taxonomy_id = ae.taxonomy.id
    where 
      ae.object.parent_id is null
      and ae.taxonomy.type = 'Lebensraum'
    union all
    select o.id, o.name, o.parent_id, a.recursion_level +1
    from ae.object o
      inner join ae.taxonomy
      on o.taxonomy_id = ae.taxonomy.id
    join a on a.id = o.parent_id
    where 
      ae.taxonomy.type = 'Lebensraum'
      and a.recursion_level <= 10
  )
  select id, name, parent_id, recursion_level
  from a
),
tax_and_objects as (
  select id, name, parent_id, recursion_level
  from art_objects
  union all
  select id, name, parent_id, recursion_level
  from lr_objects
  union all
  select id, name, parent_id, recursion_level
  from taxonomies
  union all
  select id, name, parent_id, recursion_level
  from tree_categories
)
select id, name, parent_id, recursion_level
from tax_and_objects
order by recursion_level, name;

