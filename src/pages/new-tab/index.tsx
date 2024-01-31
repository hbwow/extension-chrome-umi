import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import Layouts from '@/components/layouts';
import { Button, Form, Input, Dropdown } from 'antd';
import { RiGoogleFill } from 'react-icons/ri';

import useStore from '@/pages/new-tab/store';
import { useRegularRefreshDate } from '@/utils/hooks';
import { greetings } from '@/utils/common';
import { SEARCH_ENGINE_ICONS } from '@/utils/constants';

const NewTab = () => {
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

  useEffect(() => {
    updateBookmarkTreeNode();
    updateHistoryItem();

    listenerStorageForShowName();
    listenerStorageForSearchEngine();
  }, []);

  const handleFinish = (values: any) => {
    const q = values.search ?? '今日天气？';
    window.location.href = storageForSearchEngine + q;
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    updateBookmarkSearchResult(changedValues.search);
    updateHistorySearchResult(changedValues.search);
  };

  const isOpen =
    bookmarkSearchResult.length > 0 || historySearchResult.length > 0;

  const SearchEngineIcon = SEARCH_ENGINE_ICONS[storageForSearchEngine];

  return (
    <Layouts>
      <div className="flex-1 flex flex-col items-center pt-180">
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
                <div className="w-600 h-420 rounded-b-18 rounded-t-none border-2 border-white p-24 bg-bg-600 overflow-y-auto scroll-bar-style">
                  {bookmarkSearchResult.length > 0 && (
                    <div>
                      <span className="text-bg-100">书签</span>
                      <ul>
                        {bookmarkSearchResult.map((item) => {
                          const { id, title, url } = item;

                          return (
                            <li key={id}>
                              <Button
                                className="flex mt-4"
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
                                className="flex mt-4"
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
              );
            }}
          >
            <div className="relative">
              <Form.Item name="search">
                <Input
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
