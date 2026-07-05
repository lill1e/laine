import solid from "eslint-plugin-solid";
import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
  },
  jsPlugins: ["eslint-plugin-solid"],
  plugins: ["import"],
  rules: {
    ...solid.configs["flat/typescript"].rules,
    "import/no-relative-parent-imports": "error",
  },
});
