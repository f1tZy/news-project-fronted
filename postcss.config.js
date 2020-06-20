/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint linebreak-style: ["error", "windows"] */

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};
