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
