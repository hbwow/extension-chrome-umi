import { Modal, ModalProps, Tree } from 'antd';

import useStore from '@/pages/new-tab/store';
import { MODAL_DEFAULT_WIDTH } from '@/utils/constants';

const { DirectoryTree } = Tree;

const Bookmarks = () => {
  const { bookmarkTreeNode } = useStore();
  console.log('🚀🚀🚀 ~ bookmarkTreeNode:', bookmarkTreeNode);

  return (
    <div>
      <DirectoryTree
        treeData={bookmarkTreeNode[0].children}
        onSelect={(selectedKeys, e) => {
          console.log(e, 'eee');
          const { node } = e;
          if (node.url) {
            window.location.href = node.url;
          }
        }}
      />
    </div>
  );
};

Bookmarks.Modal = ({ ...rest }: ModalProps) => {
  return (
    <Modal
      title="书签"
      width={MODAL_DEFAULT_WIDTH}
      zIndex={9999}
      classNames={{
        body: 'h-420 overflow-y-auto  scroll-bar-style overflow-x-hidden',
      }}
      {...rest}
    />
  );
};

export default Bookmarks;
