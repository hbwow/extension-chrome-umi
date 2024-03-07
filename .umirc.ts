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
  proxy: {
    '/complete/': {
      target: 'https://www.google.com.hk/',
      secure: false,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        let target = 'https://www.google.com';
        let realUrl = target + req.url;
        proxyRes.headers['x-real-url'] = realUrl;
      },
    },
    '/sugrec': {
      target: 'https://www.baidu.com',
      secure: false,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        let target = 'https://www.baidu.com';
        let realUrl = target + req.url;
        proxyRes.headers['x-real-url'] = realUrl;
      },
    },
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
          'new-tab': {
            title: 'Memory Lane',
            description: 'hello Memory Lane',
          },
          popup: {
            title: 'popup',
            description: 'hello popup',
          },
        },
      }
    : false,
});
