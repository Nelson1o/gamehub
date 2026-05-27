import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";
import importPlugin from "eslint-plugin-import-x";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    files: ["**/*.{ts,tsx, js, jsx, mjs, cjs}"],
    plugins: {
      perfectionist,
      import: importPlugin,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "sort-imports": "off",
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          groups: [
            "react-group",
            "external",
            "src-group",
            ["parent", "sibling", "index"],
            "style",
          ],
          newlinesBetween: 1,
          customGroups: [
            {
              groupName: "react-group",
              elementNamePattern: ["^react$", "^react-dom$", "^react-.+"],
            },
            {
              groupName: "src-group",
              elementNamePattern: ["^src/", "^@/"],
            },
          ],
        },
      ],
      "perfectionist/sort-exports": ["error"],
      "perfectionist/sort-named-imports": ["error"],
      "perfectionist/sort-named-exports": ["error"],
      "perfectionist/sort-union-types": ["error"],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "unsorted",
          groups: ["shorthand-group", "multiline-group"],
          customGroups: [
            {
              groupName: "shorthand-group",
              modifiers: ["shorthand"],
              selector: "prop",
            },
            {
              groupName: "multiline-group",
              modifiers: ["multiline"],
              selector: "prop",
            },
          ],
        },
      ],
    },
  },
]);
