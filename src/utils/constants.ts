import { RiGoogleFill, RiBaiduLine } from 'react-icons/ri';

export const DRAWER_DEFAULT_WIDTH = '35vw';

export const SEARCH_ENGINE_OPTIONS = [
  {
    label: 'Google',
    value: 'Google',
  },
  {
    label: 'Baidu',
    value: 'Baidu',
  },
  // {
  //   label: 'Bing',
  //   value: 'https://www.bing.com/search?q=',
  // },
];

export const SEARCH_ENGINE_MAP = {
  Google: {
    jumpUrl: 'https://www.google.com/search?q=',
    searchUrl: process.env.isProd
      ? 'https://www.google.com/complete/search'
      : '/complete/search',
    searchUrlParams: (q) => {
      return `q=${q}&client=gws-wiz&xssi=t&hl=zh-CN`;
    },
    searchUrlResultFormat: (data: string) => {
      try {
        const arr = JSON.parse(data.split(`)]}'`)[1])[0];

        const list = arr.map((item, index) => {
          // if (item[3]) {}

          return {
            id: index,
            title: item[0],
            url: `https://www.google.com/search?q=${item[0]}`,
          };
        });

        return list;
      } catch (error) {}

      return [];
    },
    icon: RiGoogleFill,
  },
  Baidu: {
    jumpUrl: 'https://www.baidu.com/s?wd=',
    searchUrl: process.env.isProd ? 'https://www.baidu.com/sugrec' : '/sugrec',
    searchUrlParams: (q) => {
      return `prod=pc&wd=${q}`;
    },
    searchUrlResultFormat: (data: string) => {
      try {
        const { g } = JSON.parse(data);

        const list = g.map((item, index) => {
          return {
            id: index,
            title: item.q,
            url: `https://www.baidu.com/s?wd=${item.q}`,
          };
        });

        return list;
      } catch (error) {}

      return [];
    },
    icon: RiBaiduLine,
  },
};
