const ESLintPlugin = require('eslint-webpack-plugin')
const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
   return {
      supportTS: false,

      boot: ['i18n', 'axios', 'firebase'],

      css: ['app.sass'],

      extras: ['fontawesome-v5', 'roboto-font', 'material-icons'],

      build: {
         env: require('dotenv').config().parsed,

         vueRouterMode: 'history',

         chainWebpack(chain) {
            chain
               .plugin('eslint-webpack-plugin')
               .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
         },
      },

      devServer: {
         server: {
            type: 'http',
         },
         port: 8080,
         open: true,
      },

      framework: {
         config: {},

         plugins: [
            'Dialog',
            'Loading',
            'LocalStorage',
            'Notify',
            'Platform',
            'SessionStorage',
         ],
      },

      animations: [],

      ssr: {
         pwa: false,
         prodPort: 3000,
         maxAge: 1000 * 60 * 60 * 24 * 30,
         chainWebpackWebserver(chain) {
            chain
               .plugin('eslint-webpack-plugin')
               .use(ESLintPlugin, [{ extensions: ['js'] }])
         },

         middlewares: [
            ctx.prod ? 'compression' : '',
            'render', // keep this as last one
         ],
      },

      pwa: {
         workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
         workboxOptions: {}, // only for GenerateSW
         chainWebpackCustomSW(chain) {
            chain
               .plugin('eslint-webpack-plugin')
               .use(ESLintPlugin, [{ extensions: ['js'] }])
         },

         manifest: {
            name: `Quasar App`,
            short_name: `Quasar App`,
            description: `A Quasar Framework app`,
            display: 'standalone',
            orientation: 'portrait',
            background_color: '#ffffff',
            theme_color: '#027be3',
            icons: [
               {
                  src: 'icons/icon-128x128.png',
                  sizes: '128x128',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-256x256.png',
                  sizes: '256x256',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-384x384.png',
                  sizes: '384x384',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
               },
            ],
         },
      },

      cordova: {
         // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      },

      capacitor: {
         hideSplashscreen: true,
      },

      electron: {
         bundler: 'packager', // 'packager' or 'builder'

         packager: {},

         builder: {
            appId: 'quasar-template',
         },

         chainWebpackMain(chain) {
            chain
               .plugin('eslint-webpack-plugin')
               .use(ESLintPlugin, [{ extensions: ['js'] }])
         },

         chainWebpackPreload(chain) {
            chain
               .plugin('eslint-webpack-plugin')
               .use(ESLintPlugin, [{ extensions: ['js'] }])
         },
      },
   }
})
