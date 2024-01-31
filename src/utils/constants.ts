import { RiGoogleFill,RiBaiduLine } from 'react-icons/ri';

export const DRAWER_DEFAULT_WIDTH = '35vw';

export const SEARCH_ENGINE_OPTIONS = [
  {
    label: 'Google',
    value: 'https://www.google.com/search?q=',
  },
  {
    label: 'Baidu',
    value: 'https://www.baidu.com/s?wd=',
  },
  // {
  //   label: 'Bing',
  //   value: 'https://www.bing.com/search?q=',
  // },
];

export const SEARCH_ENGINE_ICONS = {
  'https://www.google.com/search?q=': RiGoogleFill,
  'https://www.baidu.com/s?wd=': RiBaiduLine,
};
