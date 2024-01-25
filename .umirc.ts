import { defineConfig } from 'umi';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  npmClient: 'pnpm',
  extraPostCSSPlugins: [require('tailwindcss')],
  copy: [{ from: 'extension', to: 'dist' }],
  define: {
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.isProd': isProd,
  },
  routes: isProd
    ? []
    : [
        { path: '/', redirect: '/new-tab' },
        { path: '/new-tab', component: 'new-tab' },
      ],
  mpa: isProd
    ? {
        getConfigFromEntryFile: true,
        entry: {
          newTab: {
            title: 'NewTabbbbb',
            description: 'hello newTab',
          },
        },
      }
    : false,
});