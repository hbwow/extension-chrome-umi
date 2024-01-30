import mockChrome from './mockChrome';

// 开发时 chrome 用假数据，生产则用真实数据
export const CHROME = () => {
  if (process.env.isProd) {
    return chrome;
  } else {
    return { ...mockChrome };
  }
};

export const DRAWER_DEFAULT_WIDTH = '35vw';
