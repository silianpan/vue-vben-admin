<template>
  <div :class="prefixCls" :style="{ width: barWidth, transition: '0.3s all' }">
    <div style="float: left">
      <slot name="extra">{{ extra }}</slot>
    </div>
    <div style="float: right">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  export default defineComponent({
    name: 'FooterToolbar',
    props: {
      prefixCls: {
        type: String,
        default: 'ant-pro-footer-toolbar',
      },
      collapsed: {
        type: Boolean,
        default: false,
      },
      isMobile: {
        type: Boolean,
        default: false,
      },
      siderWidth: {
        type: Number,
        default: undefined,
      },
      extra: {
        type: [String, Object],
        default: '',
      },
    },
    setup() {
      const barWidth = computed(() => {
        // return props.isMobile
        //   ? undefined
        //   : `calc(100% - ${props.collapsed ? 80 : props.siderWidth || 256}px)`;
        return '100%';
      });
      return {
        barWidth,
      };
    },
  });
</script>

<style lang="less" scoped>
  .ant-pro-footer-toolbar {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 9;
    width: 100%;
    height: 56px;
    padding: 0 24px;
    line-height: 56px;
    background: #fff;
    box-shadow: 0 -1px 2px rgb(0 0 0 / 3%);
    border-top: 1px solid #e8e8e8;

    &::after {
      display: block;
      clear: both;
      content: '';
    }
  }
</style>
