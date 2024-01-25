/* 用于实现插件弹出窗口的HTML和JavaScript代码 */

console.log('This is a popup!');
console.log('🚀🚀🚀 ~ chrome:', chrome);

chrome.bookmarks.getTree(function (bookmarkTreeNode) {
  console.log('🚀🚀🚀 ~ bookmarkTreeNode:', bookmarkTreeNode);
});

chrome.history.search({ text: '' }, function (historyItems) {
  console.log('🚀🚀🚀 ~ historyItems:', historyItems);
});
