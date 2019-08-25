/**
 * starts a hapi server
 * for old api for ALT and EvAB
 * in production
 */

const Hapi = require('hapi')
const pgp = require(`pg-promise`)()
const app = require(`ampersand-app`)

const alt = require('./handlers/alt.js')

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 4000,
})

async function start() {
  app.extend({
    init() {
      this.db = pgp(
        `postgres://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5432/ae`,
      )
    },
  })
  app.init()

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: alt,
  })

  await server.start()
  console.log('API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
