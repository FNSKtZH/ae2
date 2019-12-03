const path = require('path')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve(`src/templates/docTemplate.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___sort1] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    return Promise.reject(result.errors)
  }

  const { edges } = result.data.allMarkdownRemark
  edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: docTemplate,
    })
  })
}

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
  getConfig,
}) => {
  /*
  const oldConfig = getConfig()
  const config = {
    ...oldConfig,
    output: {
      ...oldConfig.output,
      globalObject: 'this',
    },
  }
  config.module.rules.push(
    {
      test: /\.js/, // assuming the files are named .js.flow
      enforce: 'pre',
      use: ['remove-flow-types-loader'],
    },
    {
      test: /\.worker\.js$/,
      use: { loader: 'workerize-loader' },
    },
  )
  actions.replaceWebpackConfig(config)
  */
  actions.setWebpackConfig({
    node: {
      fs: 'empty',
    },
    module: {
      rules: [
        {
          test: /\.js/, // assuming the files are named .js.flow
          enforce: 'pre',
          use: ['remove-flow-types-loader'],
        },
        {
          test: /\.worker\.js$/,
          use: { loader: 'workerize-loader' },
        },
      ],
    },
  })
}
