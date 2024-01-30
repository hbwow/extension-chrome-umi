import { Button, ConfigProvider, Space, theme } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

import logo from '../../../extension/assets/images/icon.png';

import Bookmarks from './Bookmarks';
import History from './History';

import './index.css';
import { useState } from 'react';

interface IProps {
  children?: React.ReactNode;
}

const Layouts = ({ children }: IProps) => {
  const [openBookmarks, setOpenBookmarks] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
      }}
    >
      <StyleProvider hashPriority="high">
        <div className="min-w-screen min-h-screen flex flex-col bg-bg-600 text-white text-20">
          <header className="h-60 p-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="w-24 h-20" src={logo} alt="logo" />
                <div className="ml-6">Memory lane</div>
              </div>

              <div>
                <Space>
                  <Button
                    type="text"
                    className="text-white"
                    onClick={() => {
                      setOpenBookmarks(true);
                    }}
                  >
                    书签
                  </Button>
                  <Button
                    type="text"
                    className="text-white"
                    onClick={() => {
                      setOpenHistory(true);
                    }}
                  >
                    历史记录
                  </Button>
                </Space>
              </div>
            </div>
          </header>
          <main className="flex-1 flex">{children}</main>

          <Bookmarks.Drawer
            open={openBookmarks}
            onClose={() => {
              setOpenBookmarks(false);
            }}
          >
            <Bookmarks />
          </Bookmarks.Drawer>

          <History.Drawer
            open={openHistory}
            onClose={() => {
              setOpenHistory(false);
            }}
          >
            <History />
          </History.Drawer>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default Layouts;
