import baseConfig from '../../prettier.config.base.js';

// prettier.config.js

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  ...baseConfig,
  plugins: ['prettier-plugin-tailwindcss'],
};
