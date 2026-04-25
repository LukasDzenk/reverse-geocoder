import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    pool: 'forks',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts'],
  },
})
