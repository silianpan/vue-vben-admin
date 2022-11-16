<template>
  <Description
    size="middle"
    title="操作信息"
    :bordered="false"
    :column="3"
    :data="operData"
    :schema="operSchema"
  />
  <Description
    size="middle"
    title="接口信息"
    :bordered="false"
    :column="3"
    :data="operData"
    :schema="interfaceSchema"
  />
</template>
<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { operSchema, interfaceSchema } from './operlog.data';
  import { OperlogListItem } from '/@/api/demo/model/monitorModel';
  import { Description } from '/@/components/Description/index';

  export default defineComponent({
    name: 'OperlogDetail',
    components: { Description },
    props: {
      record: { type: Object, default: () => {} },
    },
    setup(props) {
      const operData = ref<OperlogListItem>(props.record);
      return {
        operSchema,
        interfaceSchema,
        operData,
      };
    },
  });
</script>
