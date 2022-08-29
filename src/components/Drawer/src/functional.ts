import type { DrawerProps } from './typing';
import BasicDrawer from './Functional.vue';
import { isClient } from '/@/utils/is';
import { createVNode, mergeProps, render } from 'vue';

let instance: ReturnType<typeof createVNode> | null = null;
export function createBasicDrawer(options: DrawerProps, content: unknown, wait = false) {
  if (!isClient) return;
  const propsData: Partial<DrawerProps> = {};
  const container = document.createElement('div');
  Object.assign(
    propsData,
    {
      getContainer: container,
    },
    options,
  );

  instance = createVNode(BasicDrawer, propsData, content);
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
