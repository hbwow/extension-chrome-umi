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
        { path: '/popup', component: 'popup' },
      ],
  mpa: isProd
    ? {
        getConfigFromEntryFile: true,
        entry: {
          newTab: {
            title: 'NewTab',
            description: 'hello newTab',
          },
          popup: {
            title: 'popup',
            description: 'hello popup',
          },
        },
      }
    : false,
});
