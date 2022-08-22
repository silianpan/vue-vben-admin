import type { DrawerProps } from './typing';
import BasicDrawer from './Functional.vue';
import { isClient } from '/@/utils/is';
import { createVNode, render } from 'vue';

let instance: ReturnType<typeof createVNode> | null = null;
export function createBasicDrawer(options: DrawerProps) {
  if (!isClient) return;
  const propsData: Partial<DrawerProps> = {};
  const container = document.createElement('div');
  Object.assign(propsData, {}, options);

  instance = createVNode(BasicDrawer, propsData);
  render(instance, container);
  document.body.appendChild(container);
  return instance.component?.exposed;
}
