// @flow
/**
 * if no fields were passed: return standard fields
 * else: return passed fields added to standard fields
 * see: https://github.com/barbalex/ae2/blob/master/docs/schnittstellen.md#1212-gew%C3%A4hlte-felder
 *
 * use a paremeterized query to avoid sql injection:
 * http://vitaly-t.github.io/pg-promise/ParameterizedQuery.html
 * Uups: that is really hard because of the objects!
 */
const app = require('ampersand-app')
const sql = require('sql-tagged-template-literal')

module.exports = async (request, h) => {
  const { fields } = request.query
  if (fields === undefined) {
    // No fields passed - returning standard fields
    return await app.db.any('select * from ae.alt_standard')
  }
  const parsedFields = JSON.parse(fields)
  // separate fields
  // and make sure they all have the required values
  const taxFields = parsedFields.filter(
    f =>
      f.t &&
      f.t === 'tax' &&
      f.n &&
      f.n !== undefined &&
      f.n !== null &&
      f.p &&
      f.p !== undefined &&
      f.p !== null
  )
  const pcoFields = parsedFields.filter(
    f =>
      f.t &&
      f.t === 'pco' &&
      f.n &&
      f.n !== undefined &&
      f.n !== null &&
      f.p &&
      f.p !== undefined &&
      f.p !== null
  )
  const rcoFields = parsedFields.filter(
    f =>
      f.t &&
      f.t === 'rco' &&
      f.n &&
      f.n !== undefined &&
      f.n !== null &&
      f.p &&
      f.p !== undefined &&
      f.p !== null &&
      f.rt &&
      f.rt !== undefined &&
      f.rt
  )
  const sql1 = `select
                  concat('{', upper(ae.object.id::TEXT), '}') as "idArt",
                  (ae.object.properties->>'Taxonomie ID')::integer as "ref",
                  substring(ae.property_collection_object.properties->>'GIS-Layer', 1, 50) as "gisLayer",
                  (ae.property_collection_object.properties->>'Betrachtungsdistanz (m)')::integer AS "distance",
                  substring(COALESCE(ae.object.properties->>'Artname', concat(ae.object.properties->>'Gattung', ' ', ae.object.properties->>'Art'), '(kein Artname)'), 1, 255) as "nameLat",
                  substring(ae.object.properties->>'Name Deutsch', 1, 255) as "nameDeu",
                  CASE
                    WHEN EXISTS(
                      SELECT
                        ae.property_collection_object.properties->>'Artwert'
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id = ae.object.id
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        -- make sure Artwert can be cast to integer
                        -- there exist values like this: 14?
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                    ) THEN (
                      SELECT
                        (ae.property_collection_object.properties->>'Artwert')::int
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id = ae.object.id
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                      LIMIT 1
                    )
                    WHEN EXISTS(
                      SELECT
                        ae.property_collection_object.properties->>'Artwert'
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                    ) THEN (
                      SELECT
                        (ae.property_collection_object.properties->>'Artwert')::int
                      FROM
                        ae.property_collection_object
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                      WHERE
                        ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                        and ae.property_collection.name = 'ZH Artwert (aktuell)'
                        and ae.property_collection_object.properties->>'Artwert' ~ E'^\\\\d+$'
                        and (ae.property_collection_object.properties->>'Artwert')::integer < 2147483647
                      LIMIT 1
                    )
                    ELSE 0
                  END AS "artwert"`
  const sqlTax = taxFields.map(f => {
    let fieldName = `${f.n}: ${f.p}`
    if (fieldName.length > 63) {
      // postgre cuts off at 64
      const nLength = 63 - f.p.length - 2
      fieldName = `${f.n.substr(0, nLength)}: ${f.p}`
    }
    return `CASE
              WHEN EXISTS(
                SELECT
                  substring(ae.object.properties->>${sql`${f.p}`}, 1, 255)
                FROM
                  ae.object
                WHERE
                  ae.property_collection_object.object_id = ae.object.id
              ) THEN (
                SELECT
                  substring(ae.object.properties->>${sql`${f.p}`}, 1, 255)
                FROM
                  ae.object
                WHERE
                  ae.property_collection_object.object_id = ae.object.id
                LIMIT 1
              )
              WHEN EXISTS(
                SELECT
                  substring(ae.object.properties->>${sql`${f.p}`}, 1, 255)
                FROM
                  ae.object
                WHERE
                  ae.object.id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                  and ae.object.properties->>${sql`${f.p}`} is not null
              ) THEN (
                SELECT
                  substring(ae.object.properties->>${sql`${f.p}`}, 1, 255)
                FROM
                  ae.object
                WHERE
                  ae.object.id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                  and ae.object.properties->>${sql`${f.p}`} is not null
                LIMIT 1
              )
              ELSE null
            END AS "${fieldName}"`
  })
  const sqlPco = pcoFields.map(f => {
    let fieldName = `${f.n}: ${f.p}`
    if (fieldName.length > 63) {
      // postgre cuts off at 64
      const nLength = 63 - f.p.length - 2
      fieldName = `${f.n.substr(0, nLength)}: ${f.p}`
    }
    return `CASE
              WHEN EXISTS(
                SELECT
                  substring(ae.property_collection_object.properties->>${sql`${
                    f.p
                  }`}, 1, 255)
                FROM
                  ae.property_collection_object
                  inner join ae.property_collection
                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                WHERE
                  ae.property_collection_object.object_id = ae.object.id
                  and ae.property_collection.name = ${sql`${f.n}`}
              ) THEN (
                SELECT
                  substring(ae.property_collection_object.properties->>${sql`${
                    f.p
                  }`}, 1, 255)
                FROM
                  ae.property_collection_object
                  inner join ae.property_collection
                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                WHERE
                  ae.property_collection_object.object_id = ae.object.id
                  and ae.property_collection.name = ${sql`${f.n}`}
                LIMIT 1
              )
              WHEN EXISTS(
                SELECT
                  substring(ae.property_collection_object.properties->>${sql`${
                    f.p
                  }`}, 1, 255)
                FROM
                  ae.property_collection_object
                  inner join ae.property_collection
                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                WHERE
                  ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                  and ae.property_collection.name = ${sql`${f.n}`}
                  and ae.property_collection_object.properties->>${sql`${
                    f.p
                  }`} is not null
              ) THEN (
                SELECT
                  substring(ae.property_collection_object.properties->>${sql`${
                    f.p
                  }`}, 1, 255)
                FROM
                  ae.property_collection_object
                  inner join ae.property_collection
                  on ae.property_collection_object.property_collection_id = ae.property_collection.id
                WHERE
                  ae.property_collection_object.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                  and ae.property_collection.name = ${sql`${f.n}`}
                  and ae.property_collection_object.properties->>${sql`${
                    f.p
                  }`} is not null
                LIMIT 1
              )
              ELSE null
            END AS "${fieldName}"`
  })
  const sqlRco = rcoFields.map(f => {
    let fieldName = `${f.n} ${f.rt}: Art/LR id: ${f.p}`
    if (fieldName.length > 63) {
      // postgre cuts off at 64
      const fLength = Math.floor((63 - f.p.length - 11) / 2)
      fieldName = `${f.n.substr(0, fLength)} ${f.rt.substr(
        0,
        fLength
      )}: Art/LR: ${f.p}`
    }
    return `CASE
              WHEN EXISTS(
                SELECT
                  substring(string_agg(concat(ae.relation.object_id_relation, ': ', ae.relation.properties->>${sql`${
                    f.p
                  }`}), ' | '), 1, 255)
                FROM
                  ae.relation
                  inner join ae.property_collection
                  on ae.relation.property_collection_id = ae.property_collection.id
                WHERE
                  ae.relation.object_id = ae.object.id
                  and ae.relation.relation_type = 'Art ist an Lebensraum gebunden'
                  and ae.property_collection.name = ${sql`${f.n}`}
                GROUP BY
                  ae.object.id
              ) THEN (
                SELECT
                  substring(string_agg(concat(ae.relation.object_id_relation, ': ', ae.relation.properties->>${sql`${
                    f.p
                  }`}), ' | '), 1, 255)
                FROM
                  ae.relation
                  inner join ae.property_collection
                  on ae.relation.property_collection_id = ae.property_collection.id
                WHERE
                  ae.relation.object_id = ae.object.id
                  and ae.relation.relation_type = 'Art ist an Lebensraum gebunden'
                  and ae.property_collection.name = ${sql`${f.n}`}
                GROUP BY
                  ae.object.id
              )
              WHEN EXISTS(
                SELECT
                  substring(string_agg(concat(ae.relation.object_id_relation, ': ', ae.relation.properties->>${sql`${
                    f.p
                  }`}), ' | '), 1, 255)
                FROM
                  ae.relation
                  inner join ae.property_collection
                  on ae.relation.property_collection_id = ae.property_collection.id
                WHERE
                  ae.relation.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                  and ae.relation.relation_type = 'Art ist an Lebensraum gebunden'
                  and ae.property_collection.name = ${sql`${f.n}`}
                  and ae.relation.properties->>${sql`${f.p}`} is not null
                GROUP BY
                  ae.object.id
              ) THEN (
                SELECT
                  substring(string_agg(concat(ae.relation.object_id_relation, ': ', ae.relation.properties->>${sql`${
                    f.p
                  }`}), ' | '), 1, 255)
                FROM
                  ae.relation
                  inner join ae.property_collection
                  on ae.relation.property_collection_id = ae.property_collection.id
                WHERE
                  ae.relation.object_id in (select object_id_synonym from ae.synonym where object_id = ae.object.id)
                  and ae.relation.relation_type = 'Art ist an Lebensraum gebunden'
                  and ae.property_collection.name = ${sql`${f.n}`}
                  and ae.relation.properties->>${sql`${f.p}`} is not null
                GROUP BY
                  ae.object.id
              )
              ELSE null
            END AS "${fieldName}"`
  })
  const sqlEnd = `from
                    ae.object
                    inner join ae.taxonomy
                    on ae.object.taxonomy_id = ae.taxonomy.id
                      inner join ae.property_collection_object
                      on ae.property_collection_object.object_id = ae.object.id
                        inner join ae.property_collection
                        on ae.property_collection_object.property_collection_id = ae.property_collection.id
                  where
                    ae.taxonomy.name in('CSCF (2009)', 'SISF Index 2 (2005)')
                    and ae.object.properties is not null
                    and ae.object.properties->>'Taxonomie ID' ~ E'^\\\\d+$'
                    and (ae.object.properties->>'Taxonomie ID')::integer < 2147483647
                    and ae.property_collection.name = 'ZH GIS'
                    and ae.property_collection_object.properties->>'GIS-Layer' is not null
                    and ae.property_collection_object.properties->>'Betrachtungsdistanz (m)' ~ E'^\\\\\d+$'
                    and (ae.property_collection_object.properties->>'Betrachtungsdistanz (m)')::integer < 2147483647;`
  const mySql = `${sql1}${sqlTax.length ? `,${sqlTax.join()}` : ''}${
    sqlPco.length ? `,${sqlPco.join()}` : ''
  }${sqlRco.length ? `,${sqlRco.join()}` : ''} ${sqlEnd}`
  //console.log('sql:', sql)

  return await app.db.any(mySql)
}
