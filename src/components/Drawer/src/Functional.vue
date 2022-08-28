<script lang="tsx">
  import {
    computed,
    CSSProperties,
    defineComponent,
    getCurrentInstance,
    nextTick,
    ref,
    toRaw,
    unref,
    useAttrs,
    watch,
  } from 'vue';
  import { Drawer } from 'ant-design-vue';
  import DrawerHeader from './components/DrawerHeader.vue';
  import DrawerFooter from './components/DrawerFooter.vue';
  import { ScrollContainer } from '/@/components/Container';
  import { isFunction, isNumber } from '/@/utils/is';
  import { DrawerInstance, DrawerProps } from './typing';
  import { deepMerge } from '/@/utils';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    setup(props, { slots, emit }) {
      const visibleRef = ref(true);
      const attrs = useAttrs();
      const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);

      const { t } = useI18n();
      const { prefixVar, prefixCls } = useDesign('basic-drawer');

      function setDrawerProps(props: Partial<DrawerProps>): void {
        // Keep the last setDrawerProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);

        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible;
        }
      }

      const drawerInstance: DrawerInstance = {
        setDrawerProps: setDrawerProps,
        emitVisible: undefined,
      };
      const instance = getCurrentInstance();
      instance && emit('register', drawerInstance, instance.uid);

      // Cancel event
      async function onClose(e: Recordable) {
        const { closeFunc } = unref(getProps);
        emit('close', e);
        if (closeFunc && isFunction(closeFunc)) {
          const res = await closeFunc();
          visibleRef.value = !res;
          return;
        }
        visibleRef.value = false;
      }

      const getMergeProps = computed((): DrawerProps => {
        return deepMerge(toRaw(props), unref(propsRef));
      });

      const getProps = computed((): DrawerProps => {
        const opt = {
          placement: 'right',
          ...unref(attrs),
          ...unref(getMergeProps),
          visible: unref(visibleRef),
        };
        opt.title = undefined;
        const { isDetail, width, wrapClassName, getContainer } = opt;
        if (isDetail) {
          if (!width) {
            opt.width = '100%';
          }
          const detailCls = `${prefixCls}__detail`;
          opt.class = wrapClassName ? `${wrapClassName} ${detailCls}` : detailCls;

          if (!getContainer) {
            // TODO type error?
            opt.getContainer = `.${prefixVar}-layout-content` as any;
          }
        }
        return opt as DrawerProps;
      });

      const getBindValues = computed((): DrawerProps => {
        return {
          ...attrs,
          ...unref(getProps),
        };
      });

      // Custom implementation of the bottom button,
      const getFooterHeight = computed(() => {
        const { footerHeight, showFooter } = unref(getProps);
        if (showFooter && footerHeight) {
          return isNumber(footerHeight)
            ? `${footerHeight}px`
            : `${footerHeight.replace('px', '')}px`;
        }
        return `0px`;
      });

      const getScrollContentStyle = computed((): CSSProperties => {
        const footerHeight = unref(getFooterHeight);
        return {
          position: 'relative',
          height: `calc(100% - ${footerHeight})`,
        };
      });

      const getLoading = computed(() => {
        return !!unref(getProps)?.loading;
      });

      function handleOk() {
        emit('ok');
      }

      watch(
        () => visibleRef.value,
        (visible) => {
          nextTick(() => {
            emit('visible-change', visible);
            instance && drawerInstance.emitVisible?.(visible, instance.uid);
          });
        },
      );

      const { visible, isDetail, showDetailBack, loadingText } = unref(getProps);
      const { title } = unref(getMergeProps);

      watch(
        () => visible,
        (newVal, oldVal) => {
          if (newVal !== oldVal) visibleRef.value = newVal!;
        },
        { deep: true },
      );

      return () => {
        return (
          <Drawer class={prefixCls} onClose={onClose} {...getBindValues.value}>
            {{
              title: () =>
                slots.titleToolbar ? (
                  <DrawerHeader
                    title={title as string}
                    isDetail={isDetail}
                    showDetailBack={showDetailBack}
                    onClose={onClose}
                  >
                    {{ titleToolbar: () => slots.titleToolbar?.(), title: () => slots.title?.() }}
                  </DrawerHeader>
                ) : (
                  slots.title?.()
                ),
              default: () => (
                <>
                  <ScrollContainer
                    style={getScrollContentStyle.value}
                    loading={getLoading.value}
                    loading-tip={loadingText || t('common.loadingText')}
                  >
                    {{ default: () => slots.default?.() }}
                  </ScrollContainer>
                  <DrawerFooter
                    onClose={onClose}
                    onOk={handleOk}
                    {...getBindValues.value}
                    height={getFooterHeight.value}
                  >
                    {slots.footer ? { footer: () => slots.footer?.() } : ''}
                  </DrawerFooter>
                </>
              ),
            }}
          </Drawer>
        );
      };
    },
  });
</script>

<style lang="less">
  @header-height: 60px;
  @detail-header-height: 40px;
  @prefix-cls: ~'@{namespace}-basic-drawer';
  @prefix-cls-detail: ~'@{namespace}-basic-drawer__detail';

  .@{prefix-cls} {
    .ant-drawer-wrapper-body {
      overflow: hidden;
    }

    .ant-drawer-close {
      &:hover {
        color: @error-color;
      }
    }

    .ant-drawer-body {
      height: calc(100% - @header-height);
      padding: 0;
      background-color: @component-background;

      .scrollbar__wrap {
        padding: 16px !important;
        margin-bottom: 0 !important;
      }

      > .scrollbar > .scrollbar__bar.is-horizontal {
        display: none;
      }
    }
  }

  .@{prefix-cls-detail} {
    position: absolute;

    .ant-drawer-header {
      width: 100%;
      height: @detail-header-height;
      padding: 0;
      border-top: 1px solid @border-color-base;
      box-sizing: border-box;
    }

    .ant-drawer-title {
      height: 100%;
    }

    .ant-drawer-close {
      height: @detail-header-height;
      line-height: @detail-header-height;
    }

    .scrollbar__wrap {
      padding: 0 !important;
    }

    .ant-drawer-body {
      height: calc(100% - @detail-header-height);
    }
  }
</style>
