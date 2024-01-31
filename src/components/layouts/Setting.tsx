import { Drawer, DrawerProps, Input, Radio, Space } from 'antd';

import { DRAWER_DEFAULT_WIDTH, SEARCH_ENGINE_OPTIONS } from '@/utils/constants';
import { storageLocalSet, storageSyncSet } from '@/utils/storage';

import useStore from '@/pages/new-tab/store';

const Setting = () => {
  const { storageForShowName, storageForSearchEngine } = useStore();

  const handleChangeShowName = (e) => {
    storageSyncSet({ showName: e.target.value });
  };

  const handleChangeSearchEngine = (e) => {
    storageLocalSet({ searchEngine: e.target.value });
  };

  return (
    <div className="text-white">
      <div className="mb-24">
        <div className="mb-6 text-gray-500">展示名称：</div>
        <div className="flex items-center">
          <span>嗨，</span>
          <Input
            onChange={handleChangeShowName}
            defaultValue={storageForShowName}
          />
        </div>
      </div>

      <div>
        <div className="mb-6 text-gray-500">搜索引擎：</div>
        <Radio.Group
          onChange={handleChangeSearchEngine}
          defaultValue={storageForSearchEngine}
        >
          <Space direction="vertical">
            {SEARCH_ENGINE_OPTIONS.map((item) => {
              const { label, value } = item;

              return (
                <Radio key={value} value={value}>
                  {label}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

Setting.Drawer = ({ ...rest }: DrawerProps) => {
  return (
    <Drawer
      title="设置"
      width={DRAWER_DEFAULT_WIDTH}
      zIndex={9999}
      classNames={{
        body: 'scroll-bar-style',
      }}
      {...rest}
    />
  );
};

export default Setting;
