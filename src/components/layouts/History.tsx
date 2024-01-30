import { Button, Drawer, DrawerProps } from 'antd';

import useStore from '@/pages/new-tab/store';
import { DRAWER_DEFAULT_WIDTH } from '@/utils/constants';

const History = () => {
  const { historyItems } = useStore();

  return (
    <div>
      <div className="">
        {historyItems.map((item) => {
          const { id, title, url } = item;

          return (
            <Button className="flex mt-4" type="text" key={id} href={url}>
              <span className="truncate">{title}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

History.Drawer = ({ ...rest }: DrawerProps) => {
  return (
    <Drawer
      title="历史记录"
      width={DRAWER_DEFAULT_WIDTH}
      zIndex={9999}
      classNames={{
        body: 'scroll-bar-style',
      }}
      {...rest}
    />
  );
};

export default History;
