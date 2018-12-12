const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/scss/_variables.scss'),
        path.resolve(__dirname, 'src/assets/scss/_breakpoints.scss'),
      ]
    }
  }
};

