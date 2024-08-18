import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './src/Client/',
  build: {
    rollupOptions: {
      output: {
        dir: './dist/Client',
      },
      input: {
        main: "./src/Client/main.tsx",
      }
    }
  },
})