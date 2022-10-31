import type { ModalProps } from './typing';
import BasicModal from './Functional.vue';
import { isClient } from '/@/utils/is';
import { createVNode, mergeProps, render } from 'vue';

let instance: ReturnType<typeof createVNode> | null = null;
export function createBasicModal(options: ModalProps, content: unknown, wait = false) {
  if (!isClient) return;
  const propsData: Partial<ModalProps> = {};
  const container = document.createElement('div');
  Object.assign(
    propsData,
    {
      getContainer: () => container,
    },
    options,
  );

  instance = createVNode(BasicModal, propsData, content);
  function open() {
    instance!.props = mergeProps(instance!.props || {}, {
      visible: true,
    });
    render(instance, container);
    if (wait) {
      setTimeout(() => {
        document.body.appendChild(container);
      }, 0);
    } else {
      document.body.appendChild(container);
    }
  }
  function close() {
    instance!.props = mergeProps(instance!.props || {}, {
      visible: false,
    });
    render(null, container);
    if (wait) {
      setTimeout(() => {
        document.body.removeChild(container);
      }, 0);
    } else {
      document.body.removeChild(container);
    }
  }
  return {
    vm: instance.component?.exposed,
    open,
    close,
  };
}
