exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js/, // assuming the files are named .js.flow
          enforce: 'pre',
          use: ['remove-flow-types-loader'],
        },
      ],
    },
  })
}
