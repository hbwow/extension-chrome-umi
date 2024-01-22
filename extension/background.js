/* 运行在插件后台的JavaScript代码 */

// console.log('执行 background');

// 在安装完成之后，执行这样一个代码。相当于插件内部就存储了一个颜色。
const color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.sync.set({ color });
});
