const path = require('path');

module.exports = {
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
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: ['/Users/cdelvasto/Documents/play/mockupper/@/assets/scss/main.scss'],
    },
  },
};
