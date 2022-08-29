import type { DrawerProps } from './typing';
import BasicDrawer from './Functional.vue';
import { isClient } from '/@/utils/is';
import { createVNode, render, VNodeChild } from 'vue';

let instance: ReturnType<typeof createVNode> | null = null;
export function createBasicDrawer(
  options: DrawerProps,
  content: string | VNodeChild | JSX.Element,
) {
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
  render(instance, container);
  document.body.appendChild(container);
  return instance.component?.exposed;
}
