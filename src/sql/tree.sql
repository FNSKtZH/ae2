select '2aabf183-ad8c-4451-9aed-08ae38f8a73f'::UUID as id, 'Arten'::text as name, null::UUID as parent_id, 1::bigint as recursion_level
select '3ebc6a58-fe9f-4f46-b22a-b1a1aff45a03'::UUID as id, 'Lebensraum'::text as name, null::UUID as parent_id, 1::bigint as recursion_level
select '33744e59-1942-4341-8b2d-088d4ac96434'::UUID as id, 'Eigenschaften-Sammlungen'::text as name, null::UUID as parent_id, 1::bigint as recursion_level

-- STOP
-- TODO: 
-- create table tree_category
-- add parent_id or tree_category to ae.taxonomy
-- use these instead

with
taxonomies as (
  select id, name, '2aabf183-ad8c-4451-9aed-08ae38f8a73f'::UUID as parent_id, 2::bigint recursion_level
  from ae.taxonomy
  where type = 'Art'
  order by name
),
objects as (
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
tax_and_objects as (
  select id, name, parent_id, recursion_level
  from objects
  union all
  select id, name, parent_id, recursion_level
  from taxonomies
)
select id, name, parent_id, recursion_level
from tax_and_objects
order by recursion_level, name;


with
taxonomies as (
  select id, name, '3ebc6a58-fe9f-4f46-b22a-b1a1aff45a03'::UUID as parent_id, 2::bigint recursion_level
  from ae.taxonomy
  where type = 'Lebensraum'
  order by name
),
objects as (
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
  from objects
  union all
  select id, name, parent_id, recursion_level
  from taxonomies
)
select id, name, parent_id, recursion_level
from tax_and_objects
order by recursion_level, name;