import { defineConfig } from "eslint/config"
import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig([
  {
    ignores: ["dist/**"],
  },

  // 2. Apply base recommended rules from @eslint/js
  // This provides core JavaScript rules.
  js.configs.recommended,

  // 3. Apply base recommended rules from typescript-eslint
  // This provides TypeScript-specific rules.
  // Use tseslint.configs.recommended for general TS rules.
  // If you have a tsconfig.json and want type-aware linting rules (more powerful, but requires type info),
  // use tseslint.configs.recommendedTypeChecked instead (or tseslint.configs.strictTypeChecked).
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node, // Add Node.js global variables
      },
      // If using type-checked rules (e.g., tseslint.configs.recommendedTypeChecked):
      // parserOptions: {
      //   project: true, // Use tsconfig.json in the root or specified by tsconfigRootDir
      //   tsconfigRootDir: import.meta.dirname, // Usually the directory of eslint.config.js
      // },
    },
    // You can add specific rule overrides here if needed:
    // rules: {
    //   "no-unused-vars": "warn", // Override core JS rule
    //   "@typescript-eslint/no-unused-vars": "warn", // Override TS rule
    //   // Add other custom rules or overrides
    // }
  },

  // 4. Jest-specific overrides for test files
  // This applies ONLY to test files.
  {
    files: ["__tests__/**/*.test.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.jest, // Add Jest global variables (describe, it, expect, etc.)
      },
    },
    // You might consider adding Jest plugin rules here too:
    // Example: import eslintPluginJest from 'eslint-plugin-jest';
    // ...eslintPluginJest.configs['flat/recommended'],
    // rules: {
    //   ...eslintPluginJest.configs['flat/recommended'].rules,
    //   // your jest rule overrides
    // }
    rules: {
      "@typescript-eslint/no-require-imports": "off", // Disable this rule for Jest test files
    },
  },
  // 5. Prettier config MUST be the LAST element
  // This disables ESLint rules that conflict with Prettier's formatting.
  eslintConfigPrettier,
])
