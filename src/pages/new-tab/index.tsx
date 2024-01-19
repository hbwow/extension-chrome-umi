import { useEffect } from 'react';
import Layouts from '@/components/layouts';
import { Button, Input } from 'antd';

import useStore from '@/pages/new-tab/store';

const NewTab = () => {
  const { updateBookmarkTreeNode, updateHistoryItem } = useStore();

  useEffect(() => {
    chrome.bookmarks?.getTree(function (_bookmarkTreeNode) {
      console.log('🚀🚀🚀 ~ _bookmarkTreeNode:', _bookmarkTreeNode);
      updateBookmarkTreeNode(_bookmarkTreeNode);
    });

    chrome.history?.search({ text: '' }, function (_historyItem) {
      console.log('🚀🚀🚀 ~ _historyItem:', _historyItem);
      updateHistoryItem(_historyItem);
    });
  }, []);

  //

  return (
    <Layouts>
      <div className="flex-1 flex justify-center pt-180">
        <Input
          className="w-600 h-60 px-24 bg-bg-600  hover:bg-bg-600 focus:bg-bg-600 border-2 rounded-full border-white text-20"
          onPressEnter={(e) => {
            window.location.href = `https://www.google.com./search?q=${e.target.value}`;
          }}
        />
      </div>
    </Layouts>
  );
};

export default NewTab;
