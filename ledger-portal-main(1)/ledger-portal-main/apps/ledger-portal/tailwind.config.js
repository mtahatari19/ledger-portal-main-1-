const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const sharedTailwindConfig = require('../../libs/shared/util/tailwind-preset/src');
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedTailwindConfig],
  content: [
    join(__dirname, 'src/**/*.{html,ts,scss}'),
    'libs/**/*.{html,ts,scss}',
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        blue: colors.blue,
        green: colors.green,
        yellow: colors.yellow,
      },
    },
  },
  plugins: [],
};
