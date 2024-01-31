import { create } from 'zustand';

import mockChrome from '@/utils/mockChrome';
import {
  listenerStorage,
  storageLocalGet,
  storageLocalSet,
  storageSyncGet,
} from '@/utils/storage';
import { SEARCH_ENGINE_OPTIONS } from '@/utils/constants';

type IStore = {
  bookmarkTreeNode: any[]; // 所有书签
  historyItems: any[]; // 默认的最大条数历史记录
  bookmarkSearchResult: any[]; // 搜索书签结果
  historySearchResult: any[]; // 搜索历史记录结果
  storageForShowName: string;
  storageForSearchEngine: string;

  updateBookmarkTreeNode: () => void; // 更新 所有书签
  updateHistoryItem: () => void; // 更新 默认的最大条数历史记录
  updateBookmarkSearchResult: (value: string) => void; // 更新 搜索书签结果
  updateHistorySearchResult: (value: string) => void; // 更新 搜索历史记录结果
  listenerStorageForShowName: () => void; // 监听本地的 showName
  listenerStorageForSearchEngine: () => void; // 监听本地的 searchEngine
};

const useStore = create<IStore>()((set) => ({
  bookmarkTreeNode: [],
  historyItems: [],
  bookmarkSearchResult: [],
  historySearchResult: [],

  storageForShowName: '',
  storageForSearchEngine: '',

  updateBookmarkTreeNode: () => {
    chrome.bookmarks?.getTree((_bookmarkTreeNode: any) => {
      // console.log('🚀🚀🚀 ~ _bookmarkTreeNode:', _bookmarkTreeNode);
      set((state) => ({ bookmarkTreeNode: _bookmarkTreeNode }));
    });

    !process.env.isProd &&
      set(() => ({ bookmarkTreeNode: [...mockChrome.bookmarkTreeNode] }));
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

    !process.env.isProd &&
      set(() => ({ historyItems: [...mockChrome.historyItems] }));
  },

  updateBookmarkSearchResult: (value) => {
    chrome.bookmarks?.search(value, (_bookmarkSearchResult: any) => {
      // console.log('🚀🚀🚀 ~ _bookmarkSearchResult:', _bookmarkSearchResult);
      set((state) => ({ bookmarkSearchResult: _bookmarkSearchResult }));
    });

    !process.env.isProd &&
      set(() => ({
        bookmarkSearchResult: [...mockChrome.bookmarkSearchResult],
      }));
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

    !process.env.isProd &&
      set(() => ({
        historySearchResult: [...mockChrome.historySearchResult],
      }));
  },

  listenerStorageForShowName: () => {
    storageSyncGet(['showName']).then((res = {}) => {
      set((state) => ({ storageForShowName: res['showName'] }));
    });

    listenerStorage({
      key: 'showName',
      onCallback: ({ newValue }) => {
        set((state) => ({ storageForShowName: newValue }));
      },
    });
  },

  listenerStorageForSearchEngine: () => {
    storageLocalGet(['searchEngine']).then((res = {}) => {
      if (res['searchEngine']) {
        set((state) => ({ storageForSearchEngine: res['searchEngine'] }));
      } else {
        // 扩展程序初始化
        storageLocalSet({ searchEngine: SEARCH_ENGINE_OPTIONS[0].value });
        set((state) => ({
          storageForSearchEngine: SEARCH_ENGINE_OPTIONS[0].value,
        }));
      }
    });

    listenerStorage({
      key: 'searchEngine',
      onCallback: ({ newValue }) => {
        set((state) => ({ storageForSearchEngine: newValue }));
      },
    });
  },
}));

export default useStore;
