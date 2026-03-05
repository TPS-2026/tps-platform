import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    target: 'esnext',
    // PrimeVue is a large UI library (~800KB), this is expected
    chunkSizeWarningLimit: 850,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vue core ecosystem
          if (id.includes('node_modules/vue/') ||
              id.includes('node_modules/@vue/') ||
              id.includes('node_modules/vue-router/') ||
              id.includes('node_modules/pinia/')) {
            return 'vue-vendor'
          }
          // PrimeVue - split into core and components
          if (id.includes('node_modules/primevue/')) {
            return 'primevue'
          }
          if (id.includes('node_modules/@primevue/')) {
            return 'primevue-core'
          }
          // i18n
          if (id.includes('node_modules/vue-i18n/')) {
            return 'i18n'
          }
          // HTTP client
          if (id.includes('node_modules/axios/')) {
            return 'axios'
          }
        }
      }
    }
  }
})
