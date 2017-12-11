CREATE OR REPLACE FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  RETURNS setof ae.object AS
  $$
    SELECT
        ae.object.*
    FROM
        ae.object
    WHERE
        ae.object.id IN (
            SELECT object_id FROM ae.export_pco(export_taxonomies, tax_filters, pco_filters)
        )
        OR ae.object.id IN (
            SELECT object_id FROM ae.export_rco(export_taxonomies, tax_filters, rco_filters)
        )
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  OWNER TO postgres;
