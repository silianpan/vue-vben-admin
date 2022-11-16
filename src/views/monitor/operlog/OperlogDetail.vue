<template>
  <Description
    size="middle"
    title="操作信息"
    bordered
    :column="1"
    :data="$props.record"
    :schema="operSchema"
    :labelStyle="{ width: '20%' }"
  />
  <Description
    size="middle"
    title="接口信息"
    bordered
    :column="1"
    :data="$props.record"
    :schema="interfaceSchema"
    :labelStyle="{ width: '20%' }"
  />
</template>
<script lang="tsx">
  import { defineComponent } from 'vue';
  import { operSchema, interfaceSchema } from './operlog.data';
  import { Description } from '/@/components/Description/index';

  export default defineComponent({
    name: 'OperlogDetail',
    components: { Description },
    props: {
      record: { type: Object, default: () => {} },
    },
    setup() {
      return {
        operSchema,
        interfaceSchema,
      };
    },
  });
</script>
