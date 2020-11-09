module.exports = {
  siteMetadata: {
    title: 'arteigenschaften',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|cache|public|docs)/,
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: [
          `/Arten/*`,
          `/Lebensräume/*`,
          `/Eigenschaften-Sammlungen/*`,
          `/Export/*`,
          `/artenlistentool/*`,
          `/Benutzer/*`,
          `/Organisationen/*`,
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/docs`,
        name: 'docs-pages',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: './src/modules/typography.js',
        omitGoogleFont: true,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        // uncommented scope because of gatsby issue
        // https://github.com/gatsbyjs/gatsby/issues/27839
        //scope: '/',
        name: 'arteigenschaften.ch',
        short_name: 'arteigenschaften',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'standalone',
        icon: 'src/images/favicon256.png',
        include_favicon: true,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        gfm: true,
        commonmark: true,
        footnotes: true,
        pedantic: true,
        excerpt_separator: '<!-- end -->',
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2000,
              // uncomment this again when gatsby-plugin-manifest > 2.5.2
              //wrapperStyle: 'margin-left: 0;',
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '64',
            },
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active: true,
              // Add a custom css class
              class: 'emoji-icon',
              // Select the size (available size: 16, 24, 32, 64)
              size: 32,
              // Add custom styles
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '-3px',
                position: 'relative',
                top: '3px',
                width: '20px',
              },
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_self',
              rel: 'nofollow',
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`, // point!
            options: {
              background: 'rgba(128,128,128,0.5)',
            },
          },
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
}
