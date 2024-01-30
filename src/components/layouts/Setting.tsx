import { Drawer, DrawerProps, Input } from 'antd';

import { DRAWER_DEFAULT_WIDTH } from '@/utils/constants';
import { storageSyncSet } from '@/utils/storage';

import useStore from '@/pages/new-tab/store';

const Setting = () => {
  const { storageForShowName } = useStore();

  const handelInputName = (e) => {
    storageSyncSet({ showName: e.target.value });
  };

  return (
    <div className="text-white">
      <div className="flex items-center">
        <span>嗨，</span>
        <Input onChange={handelInputName} defaultValue={storageForShowName} />
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
