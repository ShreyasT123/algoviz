import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.glsl'],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer-motion';
            if (id.includes('d3')) return 'vendor-d3';
            if (id.includes('tone')) return 'vendor-tone';
            if (id.includes('animejs')) return 'vendor-animejs';
            if (id.includes('prismjs')) return 'vendor-prismjs';
            return 'vendor-core';
          }
        }
      }
    }
  }
})
