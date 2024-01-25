import { useEffect } from 'react';
import Layouts from '@/components/layouts';
import { Button, Form, Input, Dropdown } from 'antd';

import useStore from '@/pages/new-tab/store';

const NewTab = () => {
  const {
    bookmarkSearchResult,
    historySearchResult,

    updateBookmarkTreeNode,
    updateHistoryItem,
    updateBookmarkSearchResult,
    updateHistorySearchResult,
  } = useStore();

  useEffect(() => {
    updateBookmarkTreeNode();
    updateHistoryItem();
  }, []);

  const handleFinish = (values: any) => {
    window.location.href = `https://www.google.com./search?q=${values.search}`;
  };

  const handleValuesChange = (changedValues: any, allValues: any) => {
    updateBookmarkSearchResult(changedValues.search);
    updateHistorySearchResult(changedValues.search);
  };

  return (
    <Layouts>
      <div className="flex-1 flex flex-col items-center pt-180">
        <h1 className="w-600 text-48 mb-24 px-12">
          嗨<span className=" text-green-700">，</span>
        </h1>

        <Form
          autoComplete="off"
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
        >
          <Dropdown
            open={
              bookmarkSearchResult.length > 0 || historySearchResult.length > 0
            }
            dropdownRender={() => {
              return (
                <div className="w-600 h-420 rounded-18 p-24 bg-bg-400 overflow-y-auto scroll-bar-style">
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
              <Input className="w-600 h-60 px-24 bg-bg-600 hover:bg-bg-600 focus:bg-bg-600 border-2 rounded-full border-white text-20" />
            </Form.Item>
          </Dropdown>
        </Form>
      </div>
    </Layouts>
  );
};

export default NewTab;
