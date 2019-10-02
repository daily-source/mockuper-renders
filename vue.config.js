const path = require('path');

module.exports = {
  configureWebpack: {
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
        data: `@import "@/assets/scss/base.scss"; @import "@/assets/scss/functions.scss"; @import "@/assets/scss/mixins.scss";`,
      },
    },
  },
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/explore',
        '/nonprofit',
        '/fundraiser'
      ],
      useRenderEvent: true,
      onlyProduction: true,
 
      headless: true,
      customRendererConfig:
      {
        args: ["--auto-open-devtools-for-tabs"]
      }
    }
  }
};
