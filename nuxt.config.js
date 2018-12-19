const pkg = require('./package')
require('dotenv').load()

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Application with recipes',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['swiper/dist/css/swiper.css', '@/sass/main.sass'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/global.js', { src: '~/plugins/swiper.js', ssr: false }],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { css: false }]
  ],
  /*
  ** Apollo module configuration
  */
  apollo: {
    tokenName: 'token',
    authenticationType: 'JWT',
    clientConfigs: {
      default: {
        // todo move IPs to process variable
        httpEndpoint:
          process.env.API_URL ||
          'http://192.168.99.100:8045/graphql/' ||
          'http://127.0.0.1:8000/graphql/',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        wsEndpoint: null, // process.env.API_WS_URL || 'ws://localhost:8000/graphql/',
        tokenName: 'token',
        persisting: false,
        websocketsOnly: false
      },
      test: {
        httpEndpoint: 'http://127.0.0.1:8000/graphql/',
        wsEndpoint: null, //'ws://localhost:8000/graphql/',
        tokenName: 'token'
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
