/**
 * starts a hapi server
 * for old api for ALT and EvAB
 * in production
 */

const Hapi = require('hapi')
const pgp = require(`pg-promise`)()
const app = require(`ampersand-app`)

const config = require(`./apiServer/config.js`)
const altStandard = require('./apiServer/handlers/altStandard.js')
const alt = require('./apiServer/handlers/alt.js')
const evabArten = require('./apiServer/handlers/evabArten.js')

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

  server.route({
    method: 'GET',
    path:
      '/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen',
    handler: alt,
  })

  server.route({
    method: 'GET',
    path:
      '/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen',
    handler: (request, h) => {
      // TODO: can I redirect to api/alt?
      console.log('request:', request)
      console.log('h:', h)
      return 'hello, you reached "artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen"'
    },
  })

  server.route({
    method: 'GET',
    path: '/api/alt',
    handler: (request, h) => {
      /**
       * TODO:
       * if no fields passed, return altStandard()
       * else:
       * add mandatory fields
       * add passed fields
       */
      console.log('request:', request)
      console.log('h:', h)
      return 'hello, you reached "api/alt"'
    },
  })

  server.route({
    method: 'GET',
    path: '/artendb/_design/artendb/_list/export_evab/evab_arten',
    handler: (request, h) => h.redirect('/api/evab/arten'),
  })

  server.route({
    method: 'GET',
    path: '/api/evab/arten',
    handler: evabArten,
  })

  await server.start()
  console.log('API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
