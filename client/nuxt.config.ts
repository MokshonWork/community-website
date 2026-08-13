// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  
  // Register the Nuxt modules we just installed
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint'
  ],

  // Optional: Set default color mode
  colorMode: {
    preference: 'dark'
  },

  icon: {
    clientBundle: {
      icons: [
        'simple-icons:github',
        'simple-icons:linkedin',
        'simple-icons:x',
        'simple-icons:discord',
      ],
    },
  },
})
