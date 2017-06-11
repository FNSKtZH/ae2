process.env.NODE_ENV = 'schema'

require('../config/env')

const fs = require('fs')
const fetch = require('node-fetch')
const paths = require('../config/paths')
const {
  printSchema,
  buildClientSchema,
  introspectionQuery,
} = require('graphql/utilities')

console.log(
  'schema: process.env.REACT_APP_GRAPHQL_ENDPOINT:',
  process.env.REACT_APP_GRAPHQL_ENDPOINT
)
fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then(response => response.json())
  .then(json =>
    fs.writeFileSync(paths.appSchema, printSchema(buildClientSchema(json.data)))
  )
