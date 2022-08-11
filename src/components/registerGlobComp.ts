import type { App } from 'vue';
import { store } from '/@/store';
import { router } from '/@/router';
import { Button } from './Button';
import { Input, Layout, Modal, Drawer } from 'ant-design-vue';
import SDrawer from '/@/components2/Drawer/index';

export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(SDrawer, {
    antdModal: Modal,
    antdDrawer: Drawer,
    store,
    router,
  });
}
