import { Drawer, DrawerProps, Tree } from 'antd';

import useStore from '@/pages/new-tab/store';
import { DRAWER_DEFAULT_WIDTH } from '@/utils/constants';

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

Bookmarks.Drawer = ({ ...rest }: DrawerProps) => {
  return (
    <Drawer
      title="书签"
      width={DRAWER_DEFAULT_WIDTH}
      zIndex={9999}
      classNames={{
        body: 'scroll-bar-style',
      }}
      {...rest}
    />
  );
};

export default Bookmarks;
