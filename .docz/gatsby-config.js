const { merge } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
}

const config = {
  siteMetadata: {
    title: 'Artdaten',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/mnt/c/Users/alexa/ae2/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Artdaten',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/mnt/c/Users/alexa/ae2',
          templates:
            '/mnt/c/Users/alexa/ae2/node_modules/docz-core/dist/templates',
          packageJson: '/mnt/c/Users/alexa/ae2/package.json',
          docz: '/mnt/c/Users/alexa/ae2/.docz',
          cache: '/mnt/c/Users/alexa/ae2/.docz/.cache',
          app: '/mnt/c/Users/alexa/ae2/.docz/app',
          appPublic: '/mnt/c/Users/alexa/ae2/.docz/public',
          appNodeModules: '/mnt/c/Users/alexa/ae2/node_modules',
          appPackageJson: '/mnt/c/Users/alexa/ae2/package.json',
          appYarnLock:
            '/mnt/c/Users/alexa/ae2/node_modules/docz-core/yarn.lock',
          ownNodeModules:
            '/mnt/c/Users/alexa/ae2/node_modules/docz-core/node_modules',
          gatsbyConfig: '/mnt/c/Users/alexa/ae2/gatsby-config.js',
          gatsbyBrowser: '/mnt/c/Users/alexa/ae2/gatsby-browser.js',
          gatsbyNode: '/mnt/c/Users/alexa/ae2/gatsby-node.js',
          gatsbySSR: '/mnt/c/Users/alexa/ae2/gatsby-ssr.js',
          importsJs: '/mnt/c/Users/alexa/ae2/.docz/app/imports.js',
          rootJs: '/mnt/c/Users/alexa/ae2/.docz/app/root.jsx',
          indexJs: '/mnt/c/Users/alexa/ae2/.docz/app/index.jsx',
          indexHtml: '/mnt/c/Users/alexa/ae2/.docz/app/index.html',
          db: '/mnt/c/Users/alexa/ae2/.docz/app/db.json',
        },
      },
    },
  ],
}

module.exports = merge(config, custom)
