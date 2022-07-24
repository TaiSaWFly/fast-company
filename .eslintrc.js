module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: [0, 4],
    semi: [2, "always"],
    "space-before-function-paren": ["error", "never"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],

    "max-len": ["error", { code: 100 }],
    "comma-dangle": [0, "always"],
    "comma-dangle": [2, "always-multiline"],
    "multiline-ternary": "off",
  },
};
