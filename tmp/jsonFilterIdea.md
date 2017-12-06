Maybe: pass an object with key and value instead of a simple value to the filter, like this:

```js
allObjects(filter: {properties: {containsInsensitive: {key: "Artname", val: "iva"}}}) {
  totalCount
  nodes {
    name
    properties
  }
}
```

in https://github.com/mattbretl/postgraphile-plugin-connection-filter/blob/master/src/PgConnectionArgFilterPlugin.js:

if val is object and field type is json, apply other sql:
```sql
return sql.query`${identifier}->>'${val.key}' ILIKE '%${val.val}%'`
```
How to deal with data types of val?
