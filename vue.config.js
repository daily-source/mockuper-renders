const path = require('path');
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins:[
      new  webpack.ProvidePlugin({
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
        $: 'jquery',
      })
    ],
    resolve: {
      alias: {
        "Public": path.resolve(__dirname, 'public'),
        "Components": path.resolve(__dirname, 'src/xthon-core/lib/components'),
        "Core": path.resolve(__dirname, 'src/xthon-core/lib'),
        "LocalComponents": path.resolve(__dirname, 'src/components'),
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        data: '@import "@/assets/scss/base.scss";',
      },
    },
  },
};
