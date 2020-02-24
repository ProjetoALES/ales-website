import getSecrets from './getSecrets'

const socialProviderSecrets = getSecrets({
  path: process.env.SECRETS_PATH,
  filename: 'SOCIAL_PROVIDER_SECRETS'
})

const frontendSecrets = getSecrets({
  path: process.env.SECRETS_PATH,
  filename: 'FRONTEND_SECRETS'
})

process.env = {...process.env, ...socialProviderSecrets, ...frontendSecrets}

module.exports = {
  mode: 'universal',

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: title =>
      title ? `${title} - Projeto ALES` : 'Projeto ALES',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/caviarFont.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/toast', mode: 'client' },
    '~/plugins/serverToast',
    { src: '~/plugins/localStorage', mode: 'client' },
    '~/plugins/moment',
    '~/plugins/vueTheMask.js',
    '~/plugins/consola.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/microcipcip/cookie-universal/
    'cookie-universal-nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/pwa', { icon: false }],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],

  router: {
    middleware: ['auth', 'alesAuth']
  },
  serverMiddleware: ['~/api/index.js'],

  env: {
    AUTH0_DOMAIN: socialProviderSecrets.AUTH0_DOMAIN,
    AUTH0_API_IDENTIFIER: socialProviderSecrets.AUTH0_API_IDENTIFIER,
    RECAPTCHA_PUBLIC_KEY: frontendSecrets.RECAPTCHA_PUBLIC_KEY,
    API_URL: process.env.API_URL,
    API_URL_BROWSER: process.env.API_URL_BROWSER
  },
  auth: {
    strategies: {
      auth0: {
        domain: socialProviderSecrets.AUTH0_DOMAIN,
        client_id: socialProviderSecrets.AUTH0_CLIENT_ID,
        audience: socialProviderSecrets.AUTH0_API_IDENTIFIER,
        scope: [
          'openid',
          'profile',
          'email',
          'read:current_user',
          'update:current_user_identities',
          'update:current_user_metadata'
        ],
        userinfo_endpoint: false,
        response_type: 'token id_token',
        endpoints: {
          logout: {
            url: 'https://projetoales.auth0.com/v2/logout',
            method: 'get'
          }
        },
        // Hack that enables account linking https://auth0.com/docs/link-accounts
        refresh_token_key: 'id_token'
      }
    },
    redirect: {
      home: '/',
      callback: '/'
    },
    fullPathRedirect: true,
    resetOnError: false,
    plugins: [
      { src: '~/plugins/authHelpers', ssr: true },
      { src: '~/plugins/fetchUser', ssr: true },
      { src: '~/plugins/accountLinking', ssr: true },
      { src: '~/plugins/alesAuth', ssr: true }
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/vuetify.options.js',
    theme: {
      dark: false
    },
    defaultAssets: {
      icons: 'fa'
    },
    treeShake: false
  },
  /*
   ** Build configuration
   */
  build: {
    watch: ['api/**/*.js'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
