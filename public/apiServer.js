/**
 * starts a hapi server
 * for old api for ALT and EvAB
 * in production
 */

const Hapi = require('hapi')

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
    handler: (request, h) => h.redirect('/api/evab/arten'),
  })

  server.route({
    method: 'GET',
    path: '/api/evab/arten',
    handler: (request, h) => {
      return 'hello, you reached "api/evab/arten"'
    },
  })

  /*
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (request, h) => {
      return `hello, you reached "${request.params.path}"`
    },
  })
  */

  await server.start()
  console.log('API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
