/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro', '@trivago/prettier-plugin-sort-imports'],
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 80,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      files: '**/*.css',
      options: {
        printWidth: 130,
      },
    },
  ],
  importOrder: ['^@navikt/(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSortSpecifiers: true,
};
