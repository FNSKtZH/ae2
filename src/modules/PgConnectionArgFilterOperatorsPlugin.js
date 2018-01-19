module.exports = function PgConnectionArgFilterOperatorsPlugin(
  builder,
  { connectionFilterOperatorNames = false } = {}
) {
  builder.hook(
    'init',
    (
      _,
      {
        getTypeByName,
        addConnectionFilterOperator,
        escapeLikeWildcards,
        pgSql: sql,
        graphql: { GraphQLBoolean, GraphQLList, GraphQLNonNull },
      }
    ) => {
      addConnectionFilterOperator(
        connectionFilterOperatorNames ? 'conti' : 'containsInsensitive',
        'Checks for strings containing this value.  Case insensitive.',
        typeName => getTypeByName(typeName),
        (identifier, val) => {
          return sql.query`${identifier}->>'${val.key}' ILIKE '%${val.val}%'`
        },
        {
          allowedFieldTypes: ['JSON'],
          inputResolver: input => `%${escapeLikeWildcards(input)}%`,
        }
      )
      return _
    }
  )
}
