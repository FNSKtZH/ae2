-- 1. Authentification

-- use a trigger to manually enforce the role being a foreign key to actual
-- database roles
create or replace function auth.check_role_exists() returns trigger
  language plpgsql
  as $$
begin
  if not exists (select 1 from pg_roles as r where r.rolname = new.role) then
    raise foreign_key_violation using message =
      'unknown database role: ' || new.role;
    return null;
  end if;
  return new;
end
$$;

drop trigger if exists ensure_user_role_exists on ae.user;
create constraint trigger ensure_user_role_exists
  after insert or update on ae.user
  for each row
  execute procedure auth.check_role_exists();

create or replace function auth.encrypt_pass() returns trigger as
$$
begin
  if tg_op = 'INSERT' or new.pass <> old.pass then
    new.pass = crypt(new.pass, gen_salt('bf'));
  end if;
  return new;
end
$$
language plpgsql;

-- We’ll use the pgcrypto extension and a trigger
-- to keep passwords safe in the user table
drop trigger if exists encrypt_pass on ae.user;
create trigger encrypt_pass
  before insert or update on ae.user
  for each row
  execute procedure auth.encrypt_pass();

-- Helper to check a password against the encrypted column
-- It returns the database role for a user
-- if the name and password are correct
create or replace function auth.user_role(username text, pass text)
returns name
  language plpgsql
  as $$
begin
  return (
  select role from ae.user
   where ae.user.name = $1
     and ae.user.pass = crypt($2, ae.user.pass)
  );
end;
$$;

-- Login function which takes an user name and password
-- and returns JWT if the credentials match a user in the internal table
-- TODO: role is not needed, remove
create or replace function ae.login(username text, pass text)
returns auth.jwt_token
  as $$
declare
  _role name;
  result auth.jwt_token;
begin
  -- check username and password
  select auth.user_role($1, $2) into _role;
  if _role is null then
    raise invalid_password using message = 'invalid user or password';
  end if;

  select auth.sign(
      row_to_json(r), current_setting('app.jwt_secret')
    ) as token
    from (
      select _role as role
      --$1 as username,
      --extract(epoch from now())::integer + 60*60*24*30 as exp
    ) r
    into result;
  return (result.token, _role, $1, extract(epoch from (now() + interval '1 week')))::auth.jwt_token;
end;
$$ language plpgsql;

create or replace function current_user_name() returns text as $$
  select nullif(current_setting('jwt.claims.username', true), '')::text;
$$ language sql stable security definer;


-- 1.2: pgjwt

CREATE OR REPLACE FUNCTION auth.url_encode(data bytea) RETURNS text LANGUAGE sql AS $$
    SELECT translate(encode(data, 'base64'), E'+/=\n', '-_');
$$;


CREATE OR REPLACE FUNCTION auth.url_decode(data text) RETURNS bytea LANGUAGE sql AS $$
WITH t AS (SELECT translate(data, '-_', '+/') AS trans),
     rem AS (SELECT length(t.trans) % 4 AS remainder FROM t) -- compute padding size
    SELECT decode(
        t.trans ||
        CASE WHEN rem.remainder > 0
           THEN repeat('=', (4 - rem.remainder))
           ELSE '' END,
    'base64') FROM t, rem;
$$;


CREATE OR REPLACE FUNCTION auth.algorithm_sign(signables text, secret text, algorithm text)
RETURNS text LANGUAGE sql AS $$
WITH
  alg AS (
    SELECT CASE
      WHEN algorithm = 'HS256' THEN 'sha256'
      WHEN algorithm = 'HS384' THEN 'sha384'
      WHEN algorithm = 'HS512' THEN 'sha512'
      ELSE '' END AS id)  -- hmac throws error
SELECT auth.url_encode(hmac(signables, secret, alg.id)) FROM alg;
$$;


CREATE OR REPLACE FUNCTION auth.sign(payload json, secret text, algorithm text DEFAULT 'HS256')
RETURNS text LANGUAGE sql AS $$
WITH
  header AS (
    SELECT auth.url_encode(convert_to('{"alg":"' || algorithm || '","typ":"JWT"}', 'utf8')) AS data
    ),
  payload AS (
    SELECT auth.url_encode(convert_to(payload::text, 'utf8')) AS data
    ),
  signables AS (
    SELECT header.data || '.' || payload.data AS data FROM header, payload
    )
SELECT
    signables.data || '.' ||
    auth.algorithm_sign(signables.data, secret, algorithm) FROM signables;
$$;


CREATE OR REPLACE FUNCTION auth.verify(token text, secret text, algorithm text DEFAULT 'HS256')
RETURNS table(header json, payload json, valid boolean) LANGUAGE sql AS $$
  SELECT
    convert_from(auth.url_decode(r[1]), 'utf8')::json AS header,
    convert_from(auth.url_decode(r[2]), 'utf8')::json AS payload,
    r[3] = auth.algorithm_sign(r[1] || '.' || r[2], secret, algorithm) AS valid
  FROM regexp_split_to_array(token, '\.') r;
$$;


-- 1.2: request

drop schema if exists request cascade;
create schema request;
grant usage on schema request to public;

create or replace function request.env_var(v text) returns text as $$
    select current_setting(v, true);
$$ stable language sql;

create or replace function request.jwt_claim(c text) returns text as $$
    select request.env_var('request.jwt.claim.' || c);
$$ stable language sql;

create or replace function request.cookie(c text) returns text as $$
    select request.env_var('request.cookie.' || c);
$$ stable language sql;

create or replace function request.header(h text) returns text as $$
    select request.env_var('request.header.' || h);
$$ stable language sql;

create or replace function request.user_name() returns text as $$
    select case request.jwt_claim('username')
    when '' then ''
    else request.jwt_claim('username')::text
	end
$$ stable language sql;

create or replace function request.user_role() returns text as $$
    select request.jwt_claim('role')::text;
$$ stable language sql;


-- 2.: actual app FUNCTIONS

CREATE OR REPLACE FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  RETURNS setof ae.object AS
  $$
    DECLARE
      sql text := 'SELECT
                    ae.object.*
                  FROM
                    ae.object
                    INNER JOIN ae.taxonomy
                    ON ae.taxonomy.id = ae.object.taxonomy_id
                  WHERE
                    ae.taxonomy.name = ANY($1)';
      tf tax_filter;
      pcof pco_filter;
      pcofSql text := 'SELECT DISTINCT
                        ae.property_collection_object.object_id
                      FROM ae.property_collection_object
                        INNER JOIN ae.property_collection
                        ON ae.property_collection_object.property_collection_id = ae.property_collection.id';
      pcofSqlWhere text := '';
      rcof rco_filter;
      rcofSql text := 'SELECT DISTINCT
                        ae.relation.object_id
                      FROM ae.relation
                        INNER JOIN ae.property_collection
                        ON ae.relation.property_collection_id = ae.property_collection.id';
      rcofSqlWhere text := '';
    BEGIN
      FOREACH tf IN ARRAY tax_filters
      LOOP
        IF tf.comparator IN ('ILIKE', 'LIKE') THEN
          sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal('%' || tf.value || '%');
        ELSE
          sql := sql || ' AND ae.object.properties->>' || quote_literal(tf.pname) || ' ' || tf.comparator || ' ' || quote_literal(tf.value);
        END IF;
      END LOOP;

      IF cardinality(pco_filters) = 0 THEN
        pcofSqlWhere := pcofSqlWhere || 'false';
      ELSE
          FOREACH pcof IN ARRAY pco_filters
          LOOP
            IF pcof = pco_filters[1] THEN
              pcofSqlWhere := pcofSqlWhere || ' (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            ELSE
              pcofSqlWhere := pcofSqlWhere || ' AND (ae.property_collection.name = ' || quote_literal(pcof.pcname);
            END IF;
            IF pcof.comparator IN ('ILIKE', 'LIKE') THEN
              pcofSqlWhere := pcofSqlWhere || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal('%' || pcof.value || '%');
            ELSE
              pcofSqlWhere := pcofSqlWhere || ' AND ae.property_collection_object.properties->>' || quote_literal(pcof.pname) || ' ' || pcof.comparator || ' ' || quote_literal(pcof.value);
            END IF;
            pcofSqlWhere := pcofSqlWhere || ')';
        END LOOP;
      END IF;

      IF cardinality(rco_filters) = 0 THEN
        rcofSqlWhere := rcofSqlWhere || 'false';
      ELSE
        FOREACH rcof IN ARRAY rco_filters
        LOOP
          IF rcof = rco_filters[1] THEN
            rcofSqlWhere := rcofSqlWhere || ' (ae.property_collection.name = ' || quote_literal(rcof.pcname);
          ELSE
            rcofSqlWhere := rcofSqlWhere || ' AND (ae.property_collection.name = ' || quote_literal(rcof.pcname);
          END IF;
          IF rcof.comparator IN ('ILIKE', 'LIKE') THEN
            rcofSqlWhere := rcofSqlWhere || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal('%' || rcof.value || '%');
          ELSE
            rcofSqlWhere := rcofSqlWhere || ' AND ae.relation.properties->>' || quote_literal(rcof.pname) || ' ' || rcof.comparator || ' ' || quote_literal(rcof.value);
          END IF;
          rcofSqlWhere := rcofSqlWhere || ')';
        END LOOP;
      END IF;

      IF cardinality(pco_filters) > 0 AND cardinality(rco_filters) > 0 THEN
        sql := sql || ' AND ae.object.id IN (' || pcofSql || ' WHERE (' || pcofSqlWhere || ')) AND ae.object.id IN (' || rcofSql || ' WHERE (' || rcofSqlWhere || ')) ';
      ELSEIF cardinality(pco_filters) > 0 THEN
        sql := sql || ' AND ae.object.id IN (' || pcofSql || ' WHERE (' || pcofSqlWhere || ')) ';
      ELSEIF cardinality(rco_filters) > 0 THEN
        sql := sql || ' AND ae.object.id IN (' || rcofSql || ' WHERE (' || rcofSqlWhere || ')) ';
      END IF;

    --RAISE EXCEPTION  'export_taxonomies: %, tax_filters: %, pco_filters: %, rco_filters: %, cardinality(pco_filters): %, sql: %:', export_taxonomies, tax_filters, pco_filters, rco_filters, cardinality(pco_filters), sql;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters;
    END
  $$
  LANGUAGE plpgsql STABLE;

ALTER FUNCTION ae.export_object(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[])
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.export_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], pco_properties pco_property[])
  RETURNS setof ae.property_collection_object AS
  $$
    DECLARE
      pcop pco_property;
      sql text := 'SELECT
                    ae.property_collection_object.*
                  FROM ae.object
                    INNER JOIN ae.property_collection_object
                      INNER JOIN ae.property_collection
                      ON ae.property_collection_object.property_collection_id = ae.property_collection.id
                    ON ae.object.id = ae.property_collection_object.object_id
                  WHERE
                    ae.object.id IN (
                      SELECT id FROM ae.export_object($1, $2, $3, $4)
                    )
                    AND ae.property_collection.name IN(';
    BEGIN
        IF cardinality(pco_properties) = 0 THEN
          sql := sql || 'false';
        ELSE
          FOREACH pcop IN ARRAY pco_properties
            LOOP
            IF pcop = pco_properties[1] THEN
              sql := sql || quote_literal(pcop.pcname);
            ELSE
              sql := sql || ',' || quote_literal(pcop.pcname);
            END IF;
          END LOOP;
        END IF;
        sql := sql || ')';

    --RAISE EXCEPTION  'export_taxonomies: %, tax_filters: %, pco_filters: %, rco_filters: %, cardinality(pco_filters): %, sql: %:', export_taxonomies, tax_filters, pco_filters, rco_filters, cardinality(pco_filters), sql;
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters, pco_properties;
    END
  $$
  LANGUAGE plpgsql STABLE;

ALTER FUNCTION ae.export_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], pco_properties pco_property[])
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.export_rco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], rco_properties rco_property[])
  RETURNS setof ae.relation AS
  $$
    DECLARE
      rcop rco_property;
      sql text := 'SELECT
                    ae.relation.*
                  FROM ae.object
                    INNER JOIN ae.relation
                      INNER JOIN ae.property_collection
                      ON ae.relation.property_collection_id = ae.property_collection.id
                    ON ae.object.id = ae.relation.object_id
                  WHERE
                    ae.object.id IN (
                      SELECT id FROM ae.export_object($1, $2, $3, $4)
                    )';
    BEGIN
      IF cardinality(rco_properties) = 0 THEN
        sql := sql || 'false';
      ELSE
        FOREACH rcop IN ARRAY rco_properties
          LOOP
          IF rcop = rco_properties[1] THEN
            sql := sql || ' AND ((ae.property_collection.name = ' || quote_literal(rcop.pcname) || ' AND ae.relation.relation_type = ' || quote_literal(rcop.relationtype) || ')';
          ELSE
            sql := sql || ' OR (ae.property_collection.name = ' || quote_literal(rcop.pcname) || ' AND ae.relation.relation_type = ' || quote_literal(rcop.relationtype) || ')';
          END IF;
        END LOOP;
      END IF;
      sql := sql || ')';
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters, rco_properties;
    END
  $$
  LANGUAGE plpgsql STABLE;

ALTER FUNCTION ae.export_rco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], rco_properties rco_property[])
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.export_synonym_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], pco_properties pco_property[])
  RETURNS setof ae.property_collection_object AS
  $$
    DECLARE
        pcop pco_property;
        sql text := 'SELECT
                      ae.property_collection_object.id,
                      ae.synonym.object_id_synonym AS object_id,
                      ae.property_collection_object.property_collection_id,
                      ae.property_collection_object.property_collection_of_origin,
                      ae.property_collection_object.properties
                    FROM ae.object
                      INNER JOIN ae.property_collection_object
                        INNER JOIN ae.property_collection
                        ON ae.property_collection_object.property_collection_id = ae.property_collection.id
                      ON ae.object.id = ae.property_collection_object.object_id
                      INNER JOIN ae.synonym
                      ON ae.object.id = ae.synonym.object_id
                    WHERE
                      ae.synonym.object_id_synonym IN (
                        SELECT id FROM ae.export_object($1, $2, $3, $4)
                      )
                      AND ae.property_collection.name IN(';
    BEGIN
        IF cardinality(pco_properties) = 0 THEN
          sql := sql || 'false';
        ELSE
          FOREACH pcop IN ARRAY pco_properties
            LOOP
            IF pcop = pco_properties[1] THEN
              sql := sql || quote_literal(pcop.pcname);
            ELSE
              sql := sql || ',' || quote_literal(pcop.pcname);
            END IF;
          END LOOP;
        END IF;
        sql := sql || ')';
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters, pco_properties;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_synonym_pco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], pco_properties pco_property[])
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.export_synonym_rco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], rco_properties rco_property[])
  RETURNS setof ae.relation AS
  $$
    DECLARE
      rcop rco_property;
      sql text := 'SELECT
                    ae.relation.id,
                    ae.relation.property_collection_id,
                    ae.synonym.object_id_synonym AS object_id,
                    ae.relation.object_id_relation,
                    ae.relation.property_collection_of_origin,
                    ae.relation.relation_type,
                    ae.relation.properties
                  FROM ae.object
                    INNER JOIN ae.relation
                      INNER JOIN ae.property_collection
                      ON ae.relation.property_collection_id = ae.property_collection.id
                    ON ae.object.id = ae.relation.object_id
                    INNER JOIN ae.synonym
                    ON ae.object.id = ae.synonym.object_id
                  WHERE
                    ae.synonym.object_id_synonym IN (
                      SELECT id FROM ae.export_object($1, $2, $3, $4)
                    )';
    BEGIN
      IF cardinality(rco_properties) = 0 THEN
        sql := sql || 'false';
      ELSE
        FOREACH rcop IN ARRAY rco_properties
          LOOP
          IF rcop = rco_properties[1] THEN
            sql := sql || ' AND ((ae.property_collection.name = ' || quote_literal(rcop.pcname) || ' AND ae.relation.relation_type = ' || quote_literal(rcop.relationtype) || ')';
          ELSE
            sql := sql || ' OR (ae.property_collection.name = ' || quote_literal(rcop.pcname) || ' AND ae.relation.relation_type = ' || quote_literal(rcop.relationtype) || ')';
          END IF;
        END LOOP;
      END IF;
      sql := sql || ')';
    RETURN QUERY EXECUTE sql USING export_taxonomies, tax_filters, pco_filters, rco_filters, rco_properties;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.export_synonym_rco(export_taxonomies text[], tax_filters tax_filter[], pco_filters pco_filter[], rco_filters rco_filter[], rco_properties rco_property[])
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.object_by_object_name(object_name text)
  RETURNS setof ae.object AS
  $$
    SELECT *
    FROM ae.object
    WHERE
      ae.object.name ilike ('%' || $1 || '%')
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.object_by_object_name(object_name text)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.object_object(taxonomy_object ae.object, taxonomy_id UUID)
  RETURNS setof ae.object AS
  $$
    SELECT to1.*
    FROM ae.object AS to1
      INNER JOIN ae.object AS to2
      ON to2.parent_id = to1.id
    WHERE
      to1.id = object_object.taxonomy_object.id AND
      1 = CASE
        WHEN $2 IS NULL THEN 1
        WHEN to1.id = $2 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.object_object(taxonomy_object ae.object, taxonomy_id UUID)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.pco_properties_by_taxonomies_function(taxonomy_names text[])
  RETURNS setof ae.pco_properties_by_taxonomy AS
  $$
    WITH jsontypes AS (
      SELECT
        ae.property_collection.name AS property_collection_name,
        json_data.key AS property_name,
        CASE WHEN left(json_data.value::text,1) = '"'  THEN 'String'
          WHEN json_data.value::text ~ '^-?\d' THEN
          CASE WHEN json_data.value::text ~ '\.' THEN 'Number'
            ELSE 'Integer'
          END
          WHEN left(json_data.value::text,1) = '['  THEN 'Array'
          WHEN left(json_data.value::text,1) = '{'  THEN 'Object'
          WHEN json_data.value::text in ('true', 'false')  THEN 'Boolean'
          WHEN json_data.value::text = 'null'  THEN 'Null'
          ELSE 'unknown'
        END as jsontype
      FROM
        ae.object
        INNER JOIN ae.taxonomy
        ON ae.object.taxonomy_id = ae.taxonomy.id
        INNER JOIN ae.property_collection_object
        ON ae.object.id = ae.property_collection_object.object_id
          INNER JOIN ae.property_collection
          ON ae.property_collection.id = ae.property_collection_object.property_collection_id,
        jsonb_each(ae.property_collection_object.properties) AS json_data
      WHERE
        ae.taxonomy.name = ANY(taxonomy_names)
    )
    SELECT
      *,
      count(*)
    FROM
      jsontypes
    GROUP BY
      property_collection_name,
      property_name,
      jsontype
    ORDER BY
      property_collection_name,
      property_name,
      jsontype
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.pco_properties_by_taxonomies_function(taxonomy_names text[])
  OWNER TO postgres;


-- example query for prop_values_function:
--SELECT distinct properties->'Artwert' AS value
--FROM ae.property_collection_object
--INNER JOIN ae.property_collection ON ae.property_collection_object.property_collection_id = ae.property_collection.id
--WHERE ae.property_collection.name = 'ZH Artwert (2000)'
--ORDER BY value

CREATE OR REPLACE FUNCTION ae.prop_values_function(table_name text, prop_name text, pc_field_name text, pc_table_name text, pc_name text)
  RETURNS setof ae.prop_value AS
  $$
    DECLARE
      sql text := 'SELECT DISTINCT properties->>' || quote_literal(prop_name) || ' AS value FROM ae.' || table_name || ' INNER JOIN ae.' || pc_table_name || ' ON ae.' || table_name || '.' || pc_field_name || ' = ae.' || pc_table_name || '.id WHERE ae.' || pc_table_name || '.name = '  || quote_literal(pc_name) || ' ORDER BY value';
    BEGIN
      --RAISE EXCEPTION  'sql: %', sql;
      RETURN QUERY EXECUTE sql;
    END
  $$
  LANGUAGE plpgsql STABLE;
ALTER FUNCTION ae.prop_values_function(table_name text, prop_name text, pc_field_name text, pc_table_name text, pc_name text)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.property_collection_by_property_name(property_name text)
  RETURNS setof ae.property_collection AS
  $$
    SELECT *
    FROM ae.property_collection
    WHERE
      ae.property_collection.name ilike ('%' || $1 || '%')
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.property_collection_by_property_name(property_name text)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.rco_count_by_taxonomy_relation_type_function()
  RETURNS setof ae.rco_count_by_taxonomy_relation_type AS
  $$
    SELECT
      ae.property_collection.name AS property_collection_name,
      ae.relation.relation_type,
      count(*)
    FROM
      ae.relation
      INNER JOIN ae.property_collection
      ON ae.property_collection.id = ae.relation.property_collection_id
    GROUP BY
      property_collection_name,
      relation_type
    ORDER BY
      property_collection_name,
      relation_type
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.rco_count_by_taxonomy_relation_type_function()
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.rco_properties_by_taxonomies_function(taxonomy_names text[])
  RETURNS setof ae.rco_properties_by_taxonomy AS
  $$
    WITH jsontypes AS (
      SELECT
        ae.property_collection.name AS property_collection_name,
        ae.relation.relation_type,
        json_data.key AS property_name,
        CASE WHEN left(json_data.value::text,1) = '"'  THEN 'String'
          WHEN json_data.value::text ~ '^-?\d' THEN
          CASE WHEN json_data.value::text ~ '\.' THEN 'Number'
            ELSE 'Integer'
          END
          WHEN left(json_data.value::text,1) = '['  THEN 'Array'
          WHEN left(json_data.value::text,1) = '{'  THEN 'Object'
          WHEN json_data.value::text in ('true', 'false')  THEN 'Boolean'
          WHEN json_data.value::text = 'null'  THEN 'Null'
          ELSE 'unknown'
        END as jsontype
      FROM
        ae.object
        INNER JOIN ae.taxonomy
        ON ae.object.taxonomy_id = ae.taxonomy.id
        INNER JOIN ae.relation
        ON ae.object.id = ae.relation.object_id
          INNER JOIN ae.property_collection
          ON ae.property_collection.id = ae.relation.property_collection_id,
        jsonb_each(ae.relation.properties) AS json_data
      WHERE
        ae.taxonomy.name = ANY(taxonomy_names)
    )
    SELECT
      *,
      count(*)
    FROM
      jsontypes
    GROUP BY
      property_collection_name,
      relation_type,
      property_name,
      jsontype
    ORDER BY
      property_collection_name,
      relation_type,
      property_name,
      jsontype
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.rco_properties_by_taxonomies_function(taxonomy_names text[])
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.tax_properties_by_taxonomies_function(taxonomy_names text[])
  RETURNS setof ae.tax_properties_by_taxonomy AS
  $$
    WITH jsontypes AS (
      SELECT
        ae.taxonomy.name AS taxonomy_name,
        json_data.key AS property_name,
        CASE WHEN left(json_data.value::text,1) = '"'  THEN 'String'
          WHEN json_data.value::text ~ '^-?\d' THEN
          CASE WHEN json_data.value::text ~ '\.' THEN 'Number'
            ELSE 'Integer'
          END
          WHEN left(json_data.value::text,1) = '['  THEN 'Array'
          WHEN left(json_data.value::text,1) = '{'  THEN 'Object'
          WHEN json_data.value::text in ('true', 'false')  THEN 'Boolean'
          WHEN json_data.value::text = 'null'  THEN 'Null'
          ELSE 'unknown'
        END as jsontype
      FROM
        ae.object
        INNER JOIN ae.taxonomy
        ON ae.taxonomy.id = ae.object.taxonomy_id,
        jsonb_each(ae.object.properties) AS json_data
      WHERE
        ae.taxonomy.name = ANY(taxonomy_names)
    )
    SELECT
      *,
      count(*)
    FROM
      jsontypes
    GROUP BY
      taxonomy_name,
      property_name,
      jsontype
    ORDER BY
      taxonomy_name,
      property_name,
      jsontype
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.tax_properties_by_taxonomies_function(taxonomy_names text[])
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.taxonomy_object_level1(taxonomy_id uuid)
  RETURNS setof ae.object AS
  $$
    SELECT ae.object.*
    FROM ae.object
      INNER JOIN ae.taxonomy
      ON ae.taxonomy.id = ae.object.taxonomy_id
    WHERE
      ae.object.parent_id IS NULL AND
      1 = CASE
        WHEN $1 IS NULL THEN 1
        WHEN ae.taxonomy.id = $1 THEN 1
        ELSE 2
      END
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_object_level1(taxonomy_id uuid)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.taxonomy_with_level1_count()
  RETURNS setof ae.taxonomy_with_level1_count AS
  $$
    SELECT
      ae.taxonomy.id as taxonomy_id,
      count(*)
    FROM ae.taxonomy
      INNER JOIN ae.object
      ON ae.taxonomy.id = ae.object.taxonomy_id
    WHERE
      ae.object.parent_id IS NULL
    group by ae.taxonomy.id;
  $$
  LANGUAGE sql STABLE;
ALTER FUNCTION ae.taxonomy_with_level1_count()
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.delete_pco_of_pc(pc_id uuid)
  RETURNS setof ae.taxonomy AS
  $$
    DECLARE
      sqldel text := 'delete from ae.property_collection_object where property_collection_id = ' || quote_literal(pc_id);
      sqlreturn text := 'select * from ae.taxonomy';
    BEGIN
      --RAISE EXCEPTION  'sql: %', sql;
      execute sqldel;
      RETURN QUERY EXECUTE sqlreturn;
    END
  $$
  LANGUAGE plpgsql;
ALTER FUNCTION ae.delete_pco_of_pc(pc_id uuid)
  OWNER TO postgres;

CREATE OR REPLACE FUNCTION ae.delete_rco_of_pc(pc_id uuid)
  RETURNS setof ae.taxonomy AS
  $$
    DECLARE
      sqldel text := 'delete from ae.relation where property_collection_id = ' || quote_literal(pc_id);
      sqlreturn text := 'select * from ae.taxonomy';
    BEGIN
      --RAISE EXCEPTION  'sql: %', sql;
      execute sqldel;
      RETURN QUERY EXECUTE sqlreturn;
    END
  $$
  LANGUAGE plpgsql;
ALTER FUNCTION ae.delete_rco_of_pc(pc_id uuid)
  OWNER TO postgres;
