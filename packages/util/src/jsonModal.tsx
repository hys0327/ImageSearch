import dynamic from 'next/dynamic';
import { Modal } from 'antd';
import { Icon } from '@repo/icon';

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
  loading: () => {
    return <div className="w-full h-full text-center ">Loading...</div>;
  },
});

const jsonModal = (modalInfo: { title?: string; content: object }) => {
  const { title, content } = modalInfo;

  Modal.info({
    icon: <div />,
    title,
    width: '70vw',
    maskClosable: true,
    closable: true,
    closeIcon: <Icon iconType="CloseOutlined" />,
    onCancel: () => Modal.destroyAll(),
    content: (
      <div className="h-[70vh] overflow-auto">
        <ReactJson
          src={content}
          name={false}
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard
        />
      </div>
    ),
  });
};

export default jsonModal;
