create view ae.current_user_writable_taxonomies as
  select distinct ae.taxonomy.id
  from  
    ae.object
    inner join ae.taxonomy
      inner join ae.organization_user
        inner join ae.user
        on ae.user.id = ae.organization_user.user_id
      on ae.organization_user.organization_id = ae.taxonomy.organization_id
    on ae.object.taxonomy_id = ae.taxonomy.id
  where
    ae.user.name = current_user_name()
    and ae.organization_user.role in ('orgTaxonomyWriter', 'orgAdmin');