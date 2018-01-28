create or replace view ae.current_user_writable_taxonomies as
select distinct ae.taxonomy.id
from  
  ae.taxonomy
  inner join ae.organization_user
    inner join ae.user
    on ae.user.id = ae.organization_user.user_id
  on ae.organization_user.organization_id = ae.taxonomy.organization_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgTaxonomyWriter', 'orgAdmin');

create or replace view ae.organizations_currentuser_is_taxonomywriter as
select distinct ae.organization_user.organization_id
FROM
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgTaxonomyWriter', 'orgAdmin');

create or replace view ae.taxonomy_writers as
select distinct ae.user.name
from
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.organization_user.role in ('orgTaxonomyWriter', 'orgAdmin');

create or replace view ae.organization_admins as
select distinct ae.user.name
from
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.organization_user.role in ('orgAdmin');

create or replace view ae.collection_writers as
select distinct ae.user.name
from
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.organization_user.role in ('orgCollectionWriter', 'orgAdmin');

create or replace view ae.organizations_currentuser_is_collectionwriter as
select distinct ae.organization_user.organization_id
FROM
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgCollectionWriter', 'orgAdmin');

create or replace view ae.organizations_currentuser_is_orgadmin as
select distinct ae.organization_user.organization_id
FROM
  ae.organization_user
  inner join ae.user
  on ae.user.id = ae.organization_user.user_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgAdmin');

create or replace view ae.current_user_writable_collections as
select distinct ae.property_collection.id
from  
  ae.property_collection
  inner join ae.organization_user
    inner join ae.user
    on ae.user.id = ae.organization_user.user_id
  on ae.organization_user.organization_id = ae.property_collection.organization_id
where
  ae.user.name = current_user_name()
  and ae.organization_user.role in ('orgCollectionWriter', 'orgAdmin');

create or replace view ae.v_category_taxonomies as
WITH categoryTaxonomies AS (
    SELECT ae.object.id, ae.category.name AS category_name, ae.taxonomy.name AS taxonomy_name
    FROM ae.taxonomy
      INNER JOIN ae.object
        INNER JOIN ae.category
        ON ae.category.name = ae.object.category
      ON ae.object.taxonomy_id = ae.taxonomy.id
    GROUP BY ae.object.id, ae.category.name, ae.taxonomy.name
  )
  SELECT category_name, taxonomy_name, count(*) AS object_count
  FROM categoryTaxonomies
  GROUP BY category_name, taxonomy_name
  ORDER BY category_name, taxonomy_name;

create or replace view ae.v_category_taxonomies_without_objects as
SELECT ae.category.name AS category_name, ae.taxonomy.name AS taxonomy_name, 1::bigint as object_count
FROM ae.taxonomy, ae.category
WHERE NOT EXISTS (
  select ae.object.id from ae.object
  where ae.object.taxonomy_id = ae.taxonomy.id
);

create or replace view ae.v_taxonomies_of_categories as
select * from ae.v_category_taxonomies
    union select * from ae.v_category_taxonomies_without_objects;