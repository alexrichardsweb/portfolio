export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: `static`,
  generate: {
    fallback: true,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `Alex Richards: Web Developer`,
    htmlAttrs: {
      lang: `en`,
    },
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { hid: `description`, name: `description`, content: `` },
      { name: `format-detection`, content: `telephone=no` },
    ],
    link: [
      { rel: `icon`, type: `image/x-icon`, href: `/favicon.ico` },
    ],
  },

  /*
    **  Global environment variables
    */
  env: {
    siteTitle: `Sotic Digital`,
  },

  /*
   ** Global CSS
   */

  css: [`~assets/scss/reset.scss`],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
  */
  components: [
    {
      path: `~/components`, // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    `@nuxtjs/eslint-module`,
    `@nuxtjs/moment`,
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    `@nuxtjs/axios`,
    `@nuxtjs/style-resources`,
    `@nuxt/content`,
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: `/`,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  /*
   * Style Resources for SASS
   */

  styleResources: {
    scss: [
      `./assets/scss/colours.scss`,
      `./assets/scss/responsive.scss`,
      `./assets/scss/typography.scss`,
      `./assets/scss/elements.scss`,
      `./assets/scss/utility.scss`,
      `./assets/scss/transition.scss`,
    ],
  },
};
