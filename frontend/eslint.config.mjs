import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import { ESLint } from "eslint";
import pluginReact from "eslint-plugin-react";
import pluginTypescript from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js, react: pluginReact, "@typescript-eslint": pluginTypescript },
    extends: [
      "eslint:recommended", // Basic ESLint rules
      "plugin:react/recommended", // React rules
      "plugin:@typescript-eslint/recommended", // TypeScript rules
      "next/core-web-vitals" // Next.js best practices (optional)
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    env: {
      browser: true,
      node: true,
      es2020: true,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);
