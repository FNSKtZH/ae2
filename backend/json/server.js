/**
 * starts a hapi server
 * for old api for ALT and EvAB
 * in production
 */

const Hapi = require('@hapi/hapi')
const pgp = require(`pg-promise`)()
const app = require(`ampersand-app`)

const config = require(`./config.js`)
const alt = require('./alt.js')
const evabArten = require('./evabArten.js')

/*
const serverOptionsDevelopment = {
  debug: {
    log: ['error'],
    request: ['error']
  }
}*/

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 4000,
})

async function start() {
  app.extend({
    init() {
      this.db = pgp(config.connectionString)
    },
  })
  app.init()

  // TODO: sunset this api
  server.route({
    method: 'GET',
    path:
      '/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen',
    handler: alt,
  })

  // TODO: sunset this api
  server.route({
    method: 'GET',
    // do not redirect because query is lost!
    path:
      '/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen',
    handler: alt,
  })

  // TODO: sunset this api
  server.route({
    method: 'GET',
    path: '/api/alt',
    handler: alt,
  })

  server.route({
    method: 'GET',
    path: '/alt',
    handler: alt,
  })

  // TODO: sunset this api
  server.route({
    method: 'GET',
    path: '/artendb/_design/artendb/_list/export_evab/evab_arten',
    handler: evabArten,
  })

  // TODO: sunset this api
  server.route({
    method: 'GET',
    path: '/api/evab/arten',
    handler: evabArten,
  })

  server.route({
    method: 'GET',
    path: '/evab',
    handler: evabArten,
  })

  await server.start()
  console.log('JSON-API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
