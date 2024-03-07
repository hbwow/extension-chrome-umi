import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import Layouts from '@/components/layouts';
import { Button, Form, Input, Dropdown } from 'antd';

import useStore from '@/pages/new-tab/store';
import { useRegularRefreshDate } from '@/utils/hooks';
import { greetings } from '@/utils/common';
import { SEARCH_ENGINE_MAP } from '@/utils/constants';

const LIST_ITEM_HEIGHT = 32;
const LIST_NUMBER = 13;
const defaultUpDownSelected = { curLength: -1, data: {} };

const NewTab = () => {
  const dropdownYAutoRef = useRef(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [upDownSelected, setUpDownSelected] = useState({
    ...defaultUpDownSelected,
  });
  const [searchInputIsBlur, setSearchInputIsBlur] = useState(true);

  const {
    bookmarkSearchResult,
    historySearchResult,
    storageForShowName,
    storageForSearchEngine,

    searchEngineFetchResult,

    updateBookmarkTreeNode,
    updateHistoryItem,
    updateBookmarkSearchResult,
    updateHistorySearchResult,
    listenerStorageForShowName,
    listenerStorageForSearchEngine,

    searchEngineFetch,
  } = useStore();

  const { date } = useRegularRefreshDate();

  const handleFinish = (values: any) => {
    const q = values.search ?? '今日天气？';
    window.location.href =
      SEARCH_ENGINE_MAP[storageForSearchEngine]?.jumpUrl + q;
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    updateBookmarkSearchResult(changedValues.search);
    updateHistorySearchResult(changedValues.search);

    searchEngineFetch(changedValues.search);

    setUpDownSelected({ ...defaultUpDownSelected });
  };

  const calcScrollBar = ({ allLength, curLength, groupNumber }) => {
    // console.log('🚀🚀🚀 ~ allLength, curLength, groupNumber :', {
    //   allLength,
    //   curLength,
    //   groupNumber,
    //   LIST_NUMBER,
    //   LIST_ITEM_HEIGHT,
    // });

    // 有滚动条
    if (allLength + groupNumber > LIST_NUMBER) {
      if (curLength === 0) {
        dropdownYAutoRef.current.scrollTop = 0;
      }
      if (curLength + 1 + groupNumber > LIST_NUMBER) {
        dropdownYAutoRef.current.scrollTop =
          (curLength + 1 + groupNumber - LIST_NUMBER) * LIST_ITEM_HEIGHT;
      }
    }
  };

  const handleInputKeydown = (e) => {
    if (
      e.keyCode !== 38 &&
      e.keyCode !== 40 &&
      e.keyCode !== 13
      // && e.keyCode !== 27
    ) {
      return;
    }

    // Esc 逻辑
    // if (e.keyCode === 27) {
    //   searchInputRef.current?.blur();
    //   return;
    // }

    // Enter 逻辑
    if (e.keyCode === 13) {
      if (upDownSelected.curLength === -1) {
        // 用于回车搜索
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
    let groupNumber = 0; // 多少个组（用来计算滚动条）
    let nextCurLength = upDownSelected.curLength; // 下标

    if (bookmarkSearchResult.length > 0) {
      groupNumber += 1;
    }
    if (historySearchResult.length > 0) {
      groupNumber += 1;
    }

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

    calcScrollBar({
      allLength: allSearchResult.length,
      curLength: nextCurLength,
      groupNumber,
    });

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
    (bookmarkSearchResult.length > 0 ||
      historySearchResult.length > 0 ||
      searchEngineFetchResult.length > 0) &&
    !searchInputIsBlur;

  const SearchEngineIcon = SEARCH_ENGINE_MAP[storageForSearchEngine]?.icon;

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
                <div className="w-600 py-12 rounded-b-18 rounded-t-none border-2 border-white bg-bg-500">
                  <div className="flex">
                    {/* 书签 历史记录 */}
                    <div
                      ref={dropdownYAutoRef}
                      className="flex-1 overflow-y-auto scroll-bar-style"
                      style={{
                        maxHeight: `${LIST_NUMBER * LIST_ITEM_HEIGHT}px`,
                      }}
                    >
                      <div className="px-16">
                        {bookmarkSearchResult.length > 0 && (
                          <div>
                            <span
                              className="inline-flex items-center text-bg-100"
                              style={{ minHeight: `${LIST_ITEM_HEIGHT}px` }}
                            >
                              书签
                            </span>
                            <ul>
                              {bookmarkSearchResult.map((item) => {
                                const { id, title, url } = item;

                                return (
                                  <li key={id}>
                                    <Button
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                      }}
                                      className={cx('flex', {
                                        'lll-btn-active':
                                          upDownSelected.data.url === url,
                                      })}
                                      style={{
                                        minHeight: `${LIST_ITEM_HEIGHT}px`,
                                      }}
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
                          <div>
                            <span
                              className="inline-flex items-center text-bg-100"
                              style={{ minHeight: `${LIST_ITEM_HEIGHT}px` }}
                            >
                              历史记录
                            </span>
                            <ul>
                              {historySearchResult.map((item) => {
                                const { id, title, url } = item;

                                return (
                                  <li key={id}>
                                    <Button
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                      }}
                                      className={cx('flex', {
                                        'lll-btn-active':
                                          upDownSelected.data.url === url,
                                      })}
                                      style={{
                                        minHeight: `${LIST_ITEM_HEIGHT}px`,
                                      }}
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

                    <div className="border-l-2 border-bg-300 my-64"></div>

                    {/* 搜索引擎建议 */}
                    <div
                      className="w-1/3 overflow-y-auto scroll-bar-style"
                      style={{
                        maxHeight: `${LIST_NUMBER * LIST_ITEM_HEIGHT}px`,
                      }}
                    >
                      <div className="px-16">
                        {searchEngineFetchResult.length > 0 && (
                          <div>
                            <span
                              className="inline-flex items-center text-bg-100"
                              style={{ minHeight: `${LIST_ITEM_HEIGHT}px` }}
                            >
                              {storageForSearchEngine} 建议
                            </span>
                            <ul>
                              {searchEngineFetchResult.map((item) => {
                                const { id, title, url } = item;

                                return (
                                  <li key={id}>
                                    <Button
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                      }}
                                      className={cx('flex', {})}
                                      style={{
                                        minHeight: `${LIST_ITEM_HEIGHT}px`,
                                      }}
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
                  </div>
                </div>
              );
            }}
          >
            <div className="relative">
              <Form.Item name="search">
                <Input
                  ref={searchInputRef}
                  onKeyDown={handleInputKeydown}
                  onFocus={() => {
                    setSearchInputIsBlur(false);
                  }}
                  onBlur={() => {
                    setSearchInputIsBlur(true);
                  }}
                  className={cx(
                    'w-600 h-60 pl-24 pr-64 bg-bg-600 hover:bg-bg-500 focus:bg-bg-500 border-2 border-white hover:border-white focus:border-white text-20 transition-all ease-in',
                    {
                      'rounded-t-18 rounded-b-none': isOpen,
                      'rounded-[36px]': !isOpen,
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
