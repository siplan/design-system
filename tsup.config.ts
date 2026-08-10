import { defineConfig } from 'tsup'
import { copyFileSync } from 'node:fs'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  injectStyle: false,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    copyFileSync('src/fonts/roboto/LICENSE.txt', 'dist/Roboto-LICENSE.txt')
    copyFileSync('src/fonts/lucida-sans-unicode/NOTICE.md', 'dist/LucidaSansUnicode-NOTICE.md')
  },
})
