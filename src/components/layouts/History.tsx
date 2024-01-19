import { Button, Modal, ModalProps } from 'antd';

import useStore from '@/pages/new-tab/store';
import { MODAL_DEFAULT_WIDTH } from '@/utils/constants';

const History = () => {
  const { historyItem } = useStore();

  return (
    <div>
      <div className="">
        {historyItem.map((item) => {
          const { id, title, url } = item;

          return (
            <Button className="flex" type="link" key={id} href={url}>
              <span className="truncate">{title}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

History.Modal = ({ ...rest }: ModalProps) => {
  return (
    <Modal
      title="历史记录"
      width={MODAL_DEFAULT_WIDTH}
      classNames={{ body: 'h-420 overflow-y-auto overflow-x-hidden' }}
      {...rest}
    />
  );
};

export default History;
