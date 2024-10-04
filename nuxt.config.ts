// https://nuxt.com/docs/api/configuration/nuxt-config
import { MyPreset } from './primevue.theme'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['./base.css'],
  modules: ['@primevue/nuxt-module', '@pinia/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  primevue: {
    options: {
      theme: {
        preset: MyPreset
      }
    }
  },
  app: {
    head: {
      title: 'Cake orders',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  }
})
