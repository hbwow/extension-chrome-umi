import { useEffect, useState } from 'react';
import cx from 'classnames';

import Layouts from '@/components/layouts';
import { Button, Form, Input, Dropdown } from 'antd';

import Mousetrap from 'mousetrap';
import useStore from '@/pages/new-tab/store';
import { useRegularRefreshDate } from '@/utils/hooks';
import { greetings } from '@/utils/common';
import { SEARCH_ENGINE_ICONS } from '@/utils/constants';

const NewTab = () => {
  const defaultUpDownSelected = { curLength: -1, data: {} };
  const [upDownSelected, setUpDownSelected] = useState({
    ...defaultUpDownSelected,
  });

  const {
    bookmarkSearchResult,
    historySearchResult,
    storageForShowName,
    storageForSearchEngine,

    updateBookmarkTreeNode,
    updateHistoryItem,
    updateBookmarkSearchResult,
    updateHistorySearchResult,
    listenerStorageForShowName,
    listenerStorageForSearchEngine,
  } = useStore();

  const { date } = useRegularRefreshDate();

  const handleFinish = (values: any) => {
    const q = values.search ?? '今日天气？';
    window.location.href = storageForSearchEngine + q;
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    updateBookmarkSearchResult(changedValues.search);
    updateHistorySearchResult(changedValues.search);

    setUpDownSelected({ ...defaultUpDownSelected });
  };

  const handleInputKeydown = (e) => {
    if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 13) {
      return;
    }

    // Enter 逻辑
    if (e.keyCode === 13) {
      if (upDownSelected.curLength === -1) {
        return;
      } else {
        e.preventDefault();
        window.location.href = upDownSelected.data.url;

        return;
      }
    }

    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
    }

    const allSearchResult = [...bookmarkSearchResult, ...historySearchResult];
    let nextCurLength = 0;

    switch (e.keyCode) {
      case 38: {
        // Handle up arrow key
        nextCurLength =
          upDownSelected.curLength - 1 <= -1
            ? allSearchResult.length - 1
            : upDownSelected.curLength - 1;
        break;
      }
      case 40: {
        // Handle down arrow key
        nextCurLength =
          upDownSelected.curLength + 1 > allSearchResult.length - 1
            ? 0
            : upDownSelected.curLength + 1;
        break;
      }
    }

    setUpDownSelected({
      curLength: nextCurLength,
      data: allSearchResult[nextCurLength],
    });
  };

  useEffect(() => {
    updateBookmarkTreeNode();
    updateHistoryItem();

    listenerStorageForShowName();
    listenerStorageForSearchEngine();
  }, []);

  // 是否打开
  const isOpen =
    bookmarkSearchResult.length > 0 || historySearchResult.length > 0;

  const SearchEngineIcon = SEARCH_ENGINE_ICONS[storageForSearchEngine];

  return (
    <Layouts>
      <div className="flex-1 flex flex-col items-center pt-120">
        <div>
          <div className="pl-12 text-green-600">{greetings(date)}</div>
          <h1 className="w-600 text-48 mb-24 px-12">
            <span>嗨</span>
            <span className="text-green-700">，</span>
            <span>{storageForShowName}</span>
          </h1>
        </div>

        <Form
          autoComplete="off"
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
        >
          <Dropdown
            open={isOpen}
            dropdownRender={() => {
              return (
                <div className="w-600 h-420 pl-24 py-12 rounded-b-18 rounded-t-none border-2 border-white bg-bg-600">
                  <div className="h-full overflow-y-auto scroll-bar-style ">
                    {bookmarkSearchResult.length > 0 && (
                      <div>
                        <span className="text-bg-100">书签</span>
                        <ul>
                          {bookmarkSearchResult.map((item) => {
                            const { id, title, url } = item;

                            return (
                              <li key={id}>
                                <Button
                                  className={cx('flex mt-4', {
                                    'lll-btn-active':
                                      upDownSelected.data.url === url,
                                  })}
                                  type="text"
                                  href={url}
                                >
                                  <span className="truncate">{title}</span>
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {historySearchResult.length > 0 && (
                      <div className="mt-6">
                        <span className="text-bg-100">历史记录</span>
                        <ul>
                          {historySearchResult.map((item) => {
                            const { id, title, url } = item;

                            return (
                              <li key={id}>
                                <Button
                                  className={cx('flex mt-4', {
                                    'lll-btn-active':
                                      upDownSelected.data.url === url,
                                  })}
                                  type="text"
                                  href={url}
                                >
                                  <span className="truncate">{title}</span>
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          >
            <div className="relative">
              <Form.Item name="search">
                <Input
                  onKeyDown={handleInputKeydown}
                  className={cx(
                    'w-600 h-60 pl-24 pr-64 bg-bg-600 hover:bg-bg-600 focus:bg-bg-600 border-2 border-white text-20 transition-all duration-300',
                    {
                      'rounded-t-18 rounded-b-none': isOpen,
                      'rounded-full': !isOpen,
                    },
                  )}
                />
              </Form.Item>

              <Button
                type="text"
                shape="circle"
                className="w-[46px] h-[46px] absolute top-[7px] right-[10px] flex items-center justify-center text-32 p-2 -rotate-12"
                htmlType="submit"
              >
                {SearchEngineIcon && <SearchEngineIcon />}
              </Button>
            </div>
          </Dropdown>
        </Form>
      </div>
    </Layouts>
  );
};

export default NewTab;
