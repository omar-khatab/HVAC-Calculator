import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/app/libs/**/*.ts', 'src/app/**/*.tsx'],
      exclude: [
        'src/app/**/page.tsx',
        'src/app/**/layout.tsx',
        'src/app/components/Footer.tsx',
        'src/app/components/NavBar.tsx'
      ]
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})