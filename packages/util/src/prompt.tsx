'use client';

import { useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Input, InputRef, Modal } from 'antd';

export interface IPromptComponentProps {
  title: string;
  onSubmit: (value?: any) => void;
}

const prompt = (
  title: string,
  content?: (props: IPromptComponentProps) => JSX.Element
): Promise<any> => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function onSubmit(value?: any) {
      root.unmount();
      container.remove();

      return resolve(value);
    }

    const Component = content ? content : PromptComponent;
    root.render(<Component title={title} onSubmit={onSubmit} />);
  });
};

const PromptComponent = (props: IPromptComponentProps) => {
  const { title, onSubmit } = props;
  const ref = useRef<InputRef>(null);

  return (
    <Modal
      open
      title={title}
      onOk={() => {
        const value = ref.current?.input?.value;
        onSubmit(value);
      }}
      onCancel={() => onSubmit()}
    >
      <Input ref={ref} />
    </Modal>
  );
};

export default prompt;
