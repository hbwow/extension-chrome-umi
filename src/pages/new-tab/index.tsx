import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import Layouts from '@/components/layouts';
import { Button, Form, Input, Dropdown } from 'antd';

import useStore from '@/pages/new-tab/store';
import { useRegularRefreshDate } from '@/utils/hooks';
import { greetings } from '@/utils/common';

const NewTab = () => {
  const {
    bookmarkSearchResult,
    historySearchResult,
    storageForShowName,

    updateBookmarkTreeNode,
    updateHistoryItem,
    updateBookmarkSearchResult,
    updateHistorySearchResult,
    listenerStorageForShowName,
  } = useStore();

  const { date } = useRegularRefreshDate();

  useEffect(() => {
    updateBookmarkTreeNode();
    updateHistoryItem();

    listenerStorageForShowName();
  }, []);

  const handleFinish = (values: any) => {
    window.location.href = `https://www.google.com./search?q=${values.search}`;
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    updateBookmarkSearchResult(changedValues.search);
    updateHistorySearchResult(changedValues.search);
  };

  const isOpen =
    bookmarkSearchResult.length > 0 || historySearchResult.length > 0;

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
            <Form.Item name="search">
              <Input
                className={cx(
                  'w-600 h-60 px-24 bg-bg-600 hover:bg-bg-600 focus:bg-bg-600 border-2 border-white text-20',
                  {
                    'rounded-t-18 rounded-b-none': isOpen,
                    'rounded-full': !isOpen,
                  },
                )}
              />
            </Form.Item>
          </Dropdown>
        </Form>
      </div>
    </Layouts>
  );
};

export default NewTab;
