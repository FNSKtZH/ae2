/**
 * this query is currently not in use
 * would be a very nice way to fetch data for the tree:
 * filter by level and category
 * data for users and organizations could be added
 * ISSUE: if used as view policies would not be respected :-(
 * maybe it could be used as a function returning a set of a type (to be created)
 * would that respect policies?
 */
with
tree_categories as (
  select id, name, null::UUID as parent_id, 1::bigint as level, name as category
  from ae.tree_category
),
taxonomies as (
  select ae.taxonomy.id, ae.taxonomy.name, ae.taxonomy.tree_category as parent_id, 2::bigint as level, ae.tree_category.name as category
  from ae.taxonomy
  inner join ae.tree_category
  on ae.taxonomy.tree_category = ae.tree_category.id
),
objects as (
  with recursive a as (
    select ae.object.id, ae.object.name, ae.object.parent_id, 3::bigint as level, ae.tree_category.name as category
    from ae.object
    inner join ae.taxonomy
      inner join ae.tree_category
      on ae.taxonomy.tree_category = ae.tree_category.id
    on ae.object.taxonomy_id = ae.taxonomy.id
    where 
      ae.object.parent_id is null
    union all
    select o.id, o.name, o.parent_id, a.level +1, ae.tree_category.name as category
    from ae.object o
      inner join ae.taxonomy
        inner join ae.tree_category
        on ae.taxonomy.tree_category = ae.tree_category.id
      on o.taxonomy_id = ae.taxonomy.id
    join a on a.id = o.parent_id
    where 
      a.level <= 10
  )
  select id, name, parent_id, level, category
  from a
)
select id, name, parent_id, level, category from objects
union all
select id, name, parent_id, level, category from taxonomies
union all
select id, name, parent_id, level, category from tree_categories
order by level, category, name;

