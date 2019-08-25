/**
 * starts a hapi server
 * for old api for ALT and EvAB
 * in production
 */

const Hapi = require('hapi')
const pgp = require(`pg-promise`)()
const app = require(`ampersand-app`)

const alt = require('./handlers/alt.js')
const evabArten = require('./handlers/evabArten.js')

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
      this.db = pgp(`postgres://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5432/ae`)
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
    // do not redirect because query is lost!
    path:
      '/artendb/_design/artendb/_list/export_alt_mit_synonymen/alt_arten_mit_synonymen',
    handler: alt,
  })

  server.route({
    method: 'GET',
    path: '/api/alt',
    handler: alt,
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
