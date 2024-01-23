const { override, adjustStyleLoaders, addWebpackModuleRule } = require('customize-cra');

console.log(require.resolve('url-loader'));

module.exports = override(
  adjustStyleLoaders(({ use: [, css, postcss, resolve, processor] }) => {
    css.options.sourceMap = true;
    postcss.options.sourceMap = true;

    if (resolve) {
      resolve.options.sourceMap = true;
    }

    if (processor && processor.loader.includes('sass-loader')) {
      processor.options = {
        ...processor.options,
        sourceMap: true,
        additionalData: '@import "./src/assets/scss/global.scss";'
      }
    }
  }),
  addWebpackModuleRule({
    test: /\.(png|jpe?g)$/i,
    oneOf: [
      {
        resourceQuery: /placeholder/,
        use: {
          loader: 'webpack-image-placeholder-loader'
        }
      },
      {
        use: 'file-loader'
      }
    ]
  })
);
