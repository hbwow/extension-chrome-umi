import { create } from 'zustand';

import mockChrome from '@/utils/mockChrome';

type IStore = {
  bookmarkTreeNode: any[]; // 所有书签
  historyItems: any[]; // 默认的最大条数历史记录
  bookmarkSearchResult: any[]; // 搜索书签结果
  historySearchResult: any[]; // 搜索历史记录结果
  updateBookmarkTreeNode: () => void; // 更新 所有书签
  updateHistoryItem: () => void; // 更新 默认的最大条数历史记录
  updateBookmarkSearchResult: (value: string) => void; // 更新 搜索书签结果
  updateHistorySearchResult: (value: string) => void; // 更新 搜索历史记录结果
};

const useStore = create<IStore>()((set) => ({
  bookmarkTreeNode: process.env.isProd ? [] : [...mockChrome.bookmarkTreeNode],

  historyItems: process.env.isProd ? [] : [...mockChrome.historyItems],

  bookmarkSearchResult: process.env.isProd
    ? []
    : [...mockChrome.bookmarkSearchResult],

  historySearchResult: process.env.isProd
    ? []
    : [...mockChrome.historySearchResult],

  updateBookmarkTreeNode: () => {
    chrome.bookmarks?.getTree((_bookmarkTreeNode: any) => {
      // console.log('🚀🚀🚀 ~ _bookmarkTreeNode:', _bookmarkTreeNode);
      set((state) => ({ bookmarkTreeNode: _bookmarkTreeNode }));
    });
  },

  updateHistoryItem: () => {
    chrome.history?.search(
      {
        text: '',
        maxResults: 200,
        // startTime
        // endTime
      },
      (_historyItems: any) => {
        // console.log('🚀🚀🚀 ~ _historyItem:', _historyItem);
        set((state) => ({ historyItems: _historyItems }));
      },
    );
  },

  updateBookmarkSearchResult: (value) => {
    chrome.bookmarks?.search(value, (_bookmarkSearchResult: any) => {
      // console.log('🚀🚀🚀 ~ _bookmarkSearchResult:', _bookmarkSearchResult);
      set((state) => ({ bookmarkSearchResult: _bookmarkSearchResult }));
    });
  },

  updateHistorySearchResult: (value) => {
    if (!value) {
      set((state) => ({ historySearchResult: [] }));

      return;
    }

    chrome.history?.search(
      {
        text: value,
        maxResults: 200,
        // startTime
        // endTime
      },
      (_historySearchResult: any) => {
        // console.log('🚀🚀🚀 ~ _historySearchResult:', _historySearchResult);
        set((state) => ({ historySearchResult: _historySearchResult }));
      },
    );
  },
}));

export default useStore;
