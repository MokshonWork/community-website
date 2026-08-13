// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import tseslintParser from '@typescript-eslint/parser'

export default withNuxt(
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        // Parse <script lang="ts"> blocks as TypeScript
        // (Nuxt's generated config defaults to the JS parser).
        parser: tseslintParser,
      },
    },
  },
  // Your custom configs here
)
