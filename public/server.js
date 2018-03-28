/**
 * starts a hapi server
 * in production
 */

const Hapi = require('hapi')
const Inert = require('inert')

/*
const serverOptionsDevelopment = {
  debug: {
    log: ['error'],
    request: ['error']
  }
}*/
const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 3000,
})

server.route({
  method: 'GET',
  path: '/manifest.json',
  handler: {
    file: 'manifest.json',
  },
})

server.route({
  method: 'GET',
  path: '/asset-manifest.json',
  handler: {
    file: 'asset-manifest.json',
  },
})

server.route({
  method: 'GET',
  path: '/service-worker.js',
  handler: {
    file: 'service-worker.js',
  },
})

server.route({
  method: 'GET',
  path: '/favicon.ico',
  handler: {
    file: 'favicon.ico',
  },
})

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    file: 'index.html',
  },
})

server.route({
  method: 'GET',
  path: '/static/css/{param*}',
  handler: {
    directory: {
      path: 'static/css',
      index: false,
    },
  },
})

server.route({
  method: 'GET',
  path: '/static/js/{param*}',
  handler: {
    directory: {
      path: 'static/js',
      index: false,
    },
  },
})

server.route({
  method: 'GET',
  path: '/static/media/{param*}',
  handler: {
    directory: {
      path: 'static/media',
      index: false,
    },
  },
})

server.route({
  method: 'GET',
  path: '/favicons/{param*}',
  handler: {
    directory: {
      path: 'favicons',
      index: false,
    },
  },
})

server.route({
  method: 'GET',
  path:
    'artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true',
  handler: () =>
    'hello, you reached artendb/_design/artendb/_list/export_alt_mit_synonymen_standardfelder/alt_arten_mit_synonymen?include_docs=true',
})

async function start() {
  await server.register(Inert)
  await server.start()
  console.log('Server running at:', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
