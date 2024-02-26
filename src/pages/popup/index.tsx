/* 用于实现插件弹出窗口的HTML和JavaScript代码 */

import { useEffect, useState } from 'react';

import Layouts from '@/components/layouts';
import { Tree, Button, Input } from 'antd';

import useStore from '@/pages/popup/store';

const { DirectoryTree } = Tree;

const Popup = () => {
  const [currentTab, setCurrentTab] = useState({ url: '-', title: '-' });
  const [folderId, setFolderId] = useState('');

  const { bookmarkFolder, updateBookmarkFolder } = useStore();

  const handleSaveBookmark = () => {
    if (!folderId) {
      alert('请选择书签文件夹');
      return;
    }

    chrome.bookmarks.create({
      parentId: folderId,
      title: currentTab.title,
      url: currentTab.url,
    });

    window.close();
  };

  const handleChange = (key, value) => {
    setCurrentTab((old) => ({ ...old, [key]: value }));
  };

  useEffect(() => {
    updateBookmarkFolder();
  }, []);

  useEffect(() => {
    // console.log('popup.js');

    //返回的是popup.html这个当前页面
    // const currentUrl = window.location.href;
    // console.log(currentUrl);

    // chrome.windows.getCurrent(function (tab) {
    //   console.log(tab.id);
    // });

    chrome.tabs?.query({ currentWindow: true }, function (tabs) {
      const tab = tabs[0];

      setCurrentTab(tab);
    });
  }, []);

  return (
    <Layouts noLayouts={true}>
      <div className="w-316 p-16">
        <div className="mb-12">
          <div>
            网址：{' '}
            <Input
              value={currentTab.url}
              onChange={(e) => {
                handleChange('url', e.target.value);
              }}
            />
          </div>
          <div>
            标题：{' '}
            <Input
              value={currentTab.title}
              onChange={(e) => {
                handleChange('title', e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div className="mb-6">保存至： </div>

          <DirectoryTree
            treeData={bookmarkFolder}
            onSelect={(selectedKeys, e) => {
              const { node } = e;
              const { id } = node;

              setFolderId(id);
            }}
          />

          <Button className="mt-6" type="primary" onClick={handleSaveBookmark}>
            保存
          </Button>
        </div>
      </div>
    </Layouts>
  );
};

export default Popup;
