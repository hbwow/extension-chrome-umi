import { create } from 'zustand';

import mockChrome from '@/utils/mockChrome';

type IStore = {
  bookmarkFolder: any[];

  updateBookmarkFolder: () => void; // 更新书签文件夹
};

const useStore = create<IStore>((set) => ({
  bookmarkFolder: [],

  updateBookmarkFolder: () => {
    let nextBookmarkFolder = [];

    // 递归处理书签树
    function processBookmarks(bookmarkNodes) {
      const _bookmarkFolder = [];

      bookmarkNodes.forEach(function (node) {
        // 检查节点类型是否是文件夹
        if (node.children) {
          // 如果是文件夹，将文件夹信息添加到数组中
          const folder = {
            ...node,
            children: processBookmarks(node.children), // 递归处理子节点
          };
          _bookmarkFolder.push(folder);
        }
      });

      return _bookmarkFolder; // 返回书签文件夹数组
    }

    chrome.bookmarks?.getTree((_bookmarkTreeNode: any) => {
      nextBookmarkFolder = processBookmarks(_bookmarkTreeNode[0].children);

      set((state) => ({ bookmarkFolder: nextBookmarkFolder }));
    });

    if (!process.env.isProd) {
      nextBookmarkFolder = processBookmarks(
        mockChrome.bookmarkTreeNode[0].children,
      );

      set((state) => ({ bookmarkFolder: nextBookmarkFolder }));
    }
  },
}));

export default useStore;
