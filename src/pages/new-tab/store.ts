import { create } from 'zustand';

import mockChrome from '@/utils/mockChrome';

type IStore = {
  bookmarkTreeNode: any[];
  historyItem: any[];
  updateBookmarkTreeNode: (params: any[]) => void;
  updateHistoryItem: (params: any[]) => void;
};

const useStore = create<IStore>()((set) => ({
  bookmarkTreeNode: [...mockChrome.bookmarkTreeNode],

  historyItem: [...mockChrome.historyItem],

  updateBookmarkTreeNode: (params) =>
    set((state) => ({ bookmarkTreeNode: params })),

  updateHistoryItem: (params) => set((state) => ({ historyItem: params })),
}));

export default useStore;
