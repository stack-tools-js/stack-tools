module.exports = {
  extends: [
    'standard',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:ava/recommended',
  ],

  env: { es6: true },
};
