/**
 * starts a hapi server
 * for old api for ALT and EvAB
 * in production
 */

const Hapi = require('hapi')
const pgp = require(`pg-promise`)()
const app = require(`ampersand-app`)

const config = require(`./apiServer/config.js`)
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
  server.route({
    method: 'GET',
    path:
      '/artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen',
    handler: (request, h) => {
      // TODO: can I redirect to api/alt?
      return 'hello, you reached "artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen"'
    },
  })

  server.route({
    method: 'GET',
    path:
      '/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen',
    handler: (request, h) => {
      // TODO: can I redirect to api/alt?
      return 'hello, you reached "artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen"'
    },
  })

  server.route({
    method: 'GET',
    path: '/api/alt',
    handler: (request, h) => {
      /**
       * TODO:
       * add mandatory fields
       * if fields are passed, add them
       */
      return 'hello, you reached "api/alt"'
    },
  })

  server.route({
    method: 'GET',
    path: '/artendb/_design/artendb/_list/export_evab/evab_arten',
    handler: (request, h) => {
      console.log(
        'you have reached "/artendb/_design/artendb/_list/export_evab/evab_arten" - redirecting to "/api/evab/arten"'
      )
      h.redirect('/api/evab/arten')
    },
  })

  server.route({
    method: 'GET',
    path: '/api/evab/arten',
    handler: (request, h) => {
      console.log('you have reached "/api/evab/arten"')
      evabArten()
    },
  })

  app.extend({
    init() {
      this.db = pgp(config.connectionString)
    },
  })
  app.init()

  await server.start()
  console.log('API-Server running at:', server.info.uri)
  //console.log('evabArten:', evabArten)
  //console.log('pgp:', pgp)
  //console.log('config.connectionString:', config.connectionString)
  //console.log('app.db:', app.db)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
