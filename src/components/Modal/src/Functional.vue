<script lang="tsx">
  import type { ModalProps, ModalMethods } from './typing';

  import {
    defineComponent,
    computed,
    ref,
    watch,
    unref,
    watchEffect,
    toRef,
    getCurrentInstance,
    nextTick,
  } from 'vue';

  import Modal from './components/Modal';
  import ModalWrapper from './components/ModalWrapper.vue';
  import ModalClose from './components/ModalClose.vue';
  import ModalFooter from './components/ModalFooter.vue';
  import ModalHeader from './components/ModalHeader.vue';
  import { isFunction } from '/@/utils/is';
  import { deepMerge } from '/@/utils';
  import { basicProps } from './props';
  import { useFullScreen } from './hooks/useModalFullScreen';
  import { omit } from 'lodash-es';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'height-change', 'cancel', 'ok', 'register', 'update:visible'],
    setup(props, { slots, emit, attrs }) {
      const visibleRef = ref(true);
      const propsRef = ref<Partial<ModalProps> | null>(null);
      const modalWrapperRef = ref<any>(null);
      const { prefixCls } = useDesign('basic-modal');

      // modal   Bottom and top height
      const extHeightRef = ref(0);
      const modalMethods: ModalMethods = {
        setModalProps,
        emitVisible: undefined,
        redoModalHeight: () => {
          nextTick(() => {
            if (unref(modalWrapperRef)) {
              (unref(modalWrapperRef) as any).setModalHeight();
            }
          });
        },
      };

      const instance = getCurrentInstance();
      if (instance) {
        emit('register', modalMethods, instance.uid);
      }

      // Custom title component: get title
      const getMergeProps = computed((): Recordable => {
        return {
          ...props,
          ...(unref(propsRef) as any),
        };
      });

      const { handleFullScreen, getWrapClassName, fullScreenRef } = useFullScreen({
        modalWrapperRef,
        extHeightRef,
        wrapClassName: toRef(getMergeProps.value, 'wrapClassName'),
      });

      // modal component does not need title and origin buttons
      const getProps = computed((): Recordable => {
        const opt = {
          ...unref(getMergeProps),
          visible: unref(visibleRef),
          okButtonProps: undefined,
          cancelButtonProps: undefined,
          title: undefined,
        };
        return {
          ...opt,
          wrapClassName: unref(getWrapClassName),
        };
      });

      const getBindValue = computed((): Recordable => {
        const attr = {
          ...attrs,
          ...unref(getMergeProps),
          visible: unref(visibleRef),
          wrapClassName: unref(getWrapClassName),
        };
        if (unref(fullScreenRef)) {
          return omit(attr, ['height', 'title']);
        }
        return omit(attr, 'title');
      });

      const getWrapperHeight = computed(() => {
        if (unref(fullScreenRef)) return undefined;
        return unref(getProps).height;
      });

      watchEffect(() => {
        visibleRef.value = !!props.visible;
        fullScreenRef.value = !!props.defaultFullscreen;
      });

      watch(
        () => unref(visibleRef),
        (v) => {
          emit('visible-change', v);
          emit('update:visible', v);
          instance && modalMethods.emitVisible?.(v, instance.uid);
          nextTick(() => {
            if (props.scrollTop && v && unref(modalWrapperRef)) {
              (unref(modalWrapperRef) as any).scrollTop();
            }
          });
        },
        {
          immediate: false,
        },
      );

      // 取消事件
      async function handleCancel(e: Event) {
        e?.stopPropagation();
        // 过滤自定义关闭按钮的空白区域
        if ((e.target as HTMLElement)?.classList?.contains(prefixCls + '-close--custom')) return;
        if (props.closeFunc && isFunction(props.closeFunc)) {
          const isClose: boolean = await props.closeFunc();
          visibleRef.value = !isClose;
          return;
        }

        visibleRef.value = false;
        emit('cancel', e);
      }

      /**
       * @description: 设置modal参数
       */
      function setModalProps(props: Partial<ModalProps>): void {
        // Keep the last setModalProps
        propsRef.value = deepMerge(unref(propsRef) || ({} as any), props);
        if (Reflect.has(props, 'visible')) {
          visibleRef.value = !!props.visible;
        }
        if (Reflect.has(props, 'defaultFullscreen')) {
          fullScreenRef.value = !!props.defaultFullscreen;
        }
      }

      function handleOk(e: Event) {
        emit('ok', e);
      }

      function handleHeightChange(height: string) {
        emit('height-change', height);
      }

      function handleExtHeight(height: number) {
        extHeightRef.value = height;
      }

      function handleTitleDbClick(e) {
        if (!props.canFullscreen) return;
        e.stopPropagation();
        handleFullScreen(e);
      }

      const {
        canFullscreen,
        helpMessage,
        useWrapper,
        loading,
        loadingTip,
        minHeight,
        wrapperFooterOffset,
        footer,
      } = unref(getProps);
      const { title } = unref(getMergeProps);

      return () => {
        return (
          <Modal class={prefixCls} onClose={handleCancel} {...getBindValue.value}>
            {{
              closeIcon: () =>
                slots.closeIcon ? (
                  slots.closeIcon?.()
                ) : (
                  <ModalClose
                    canFullscreen={canFullscreen}
                    fullScreen={fullScreenRef.value}
                    onCancel={handleCancel}
                    onFullscreen={handleFullScreen}
                  />
                ),
              title: () =>
                slots.title ? (
                  slots.title?.()
                ) : (
                  <ModalHeader
                    helpMessage={helpMessage}
                    title={title}
                    onDblclick={handleTitleDbClick}
                  />
                ),
              footer: () =>
                slots.footer ? (
                  slots.footer?.()
                ) : (
                  <ModalFooter
                    {...getBindValue.value}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  ></ModalFooter>
                ),
              default: () => (
                <ModalWrapper
                  useWrapper={useWrapper}
                  footerOffset={wrapperFooterOffset}
                  fullScreen={fullScreenRef.value}
                  ref={modalWrapperRef}
                  loading={loading}
                  loadingTip={loadingTip}
                  minHeight={minHeight}
                  height={getWrapperHeight.value}
                  visible={visibleRef.value}
                  modalFooterHeight={footer !== undefined && !footer ? 0 : undefined}
                  onExtHeight={handleExtHeight}
                  onHeightChange={handleHeightChange}
                >
                  {{ default: () => slots.default?.() }}
                </ModalWrapper>
              ),
            }}
          </Modal>
        );
      };
    },
  });
</script>
