/* 用于实现插件弹出窗口的HTML和JavaScript代码 */

import { useEffect, useState } from 'react';

import Layouts from '@/components/layouts';
import { Tree, Button, Input, message } from 'antd';

import useStore from '@/pages/popup/store';

const { DirectoryTree } = Tree;

const Popup = () => {
  const [currentTab, setCurrentTab] = useState({ url: '-', title: '-' });
  const [folderId, setFolderId] = useState('');
  const [saveDisable, setSaveDisable] = useState(false);

  const { bookmarkFolder, updateBookmarkFolder } = useStore();

  const [messageApi, contextHolder] = message.useMessage();

  const handleSaveBookmark = () => {
    if (!folderId) {
      messageApi.warning('请选择书签文件夹!', 1);
      return;
    }

    setSaveDisable(true);

    chrome.bookmarks?.create({
      parentId: folderId,
      title: currentTab.title,
      url: currentTab.url,
    });

    messageApi.success('保存成功!', 1, () => {
      window.close();
      setSaveDisable(false);
    });
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

    chrome.tabs?.query({ currentWindow: true, active: true }, function (tabs) {
      const tab = tabs[0];

      setCurrentTab(tab);
    });
  }, []);

  return (
    <Layouts noLayouts={true}>
      {contextHolder}
      <div className="w-316 h-316 p-16 flex flex-col">
        <div className="flex-1 overflow-y-auto scroll-bar-style">
          <div className="mb-12">
            <div className="mb-2">
              网址：
              <Input
                value={currentTab.url}
                onChange={(e) => {
                  handleChange('url', e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              标题：
              <Input
                value={currentTab.title}
                onChange={(e) => {
                  handleChange('title', e.target.value);
                }}
              />
            </div>

            {/* <div className="mb-2">摘要： -</div> */}
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
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            className="mt-6"
            onClick={handleSaveBookmark}
            disabled={saveDisable}
          >
            保存
          </Button>
        </div>
      </div>
    </Layouts>
  );
};

export default Popup;
