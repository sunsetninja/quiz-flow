module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    "no-console": "off",
  },
};
