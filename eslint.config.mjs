import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "*.config.js"],
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [js.configs.recommended],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: ts.parser,
      sourceType: "module",
      globals: globals.browser,
    },
    extends: [...ts.configs.recommended],
  },
]);
