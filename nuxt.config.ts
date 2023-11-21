// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  pages: true,

  css: [
    '@/assets/scss/default.scss'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/utils.scss" as *;'
        }
      }
    }
  },

  imports: {
    dirs: ['utils']
  }
})
