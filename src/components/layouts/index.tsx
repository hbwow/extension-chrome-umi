import { useState } from 'react';

import { Button, ConfigProvider, Space, theme } from 'antd';

import logo from '../../../extension/assets/images/icon.png';

import Bookmarks from './Bookmarks';
import History from './History';
import Setting from './Setting';

import { RiSettings4Line } from 'react-icons/ri';

import './index.css';

interface IProps {
  noLayouts?: boolean;
  children?: React.ReactNode;
}

const Layouts = ({ noLayouts = false, children }: IProps) => {
  const [openBookmarks, setOpenBookmarks] = useState(false); // 书签
  const [openHistory, setOpenHistory] = useState(false); // 历史记录
  const [openSetting, setOpenSetting] = useState(false); // 设置

  return (
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
      }}
    >
      {noLayouts === true && (
        <div className="bg-bg-600 text-white">
          <main>{children}</main>
        </div>
      )}

      {noLayouts === false && (
        <div className="min-w-screen min-h-screen flex flex-col bg-bg-600 text-white text-20">
          <header className="h-60 p-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="w-32 h-32" src={logo} alt="logo" />
                <div className="ml-6">Memory Lane</div>
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
                  <Button
                    type="text"
                    className="text-white text-16"
                    onClick={() => {
                      setOpenSetting(true);
                    }}
                  >
                    <RiSettings4Line />
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

          <Setting.Drawer
            open={openSetting}
            onClose={() => {
              setOpenSetting(false);
            }}
          >
            <Setting />
          </Setting.Drawer>
        </div>
      )}
    </ConfigProvider>
  );
};

export default Layouts;
