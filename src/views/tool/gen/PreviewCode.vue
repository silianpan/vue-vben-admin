<template>
  <a-tabs>
    <a-tab-pane
      v-for="(value, key) in previewData"
      :tab="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
      :key="key"
    >
      <div id="codeView">
        <pre><code v-text="value"></code></pre>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { previewCodeGen } from '/@/api/demo/monitor';

  export default defineComponent({
    name: 'PreviewCode',
    components: { ATabs: Tabs, ATabPane: TabPane },
    props: {
      tableId: { type: Number, default: 0 },
    },
    setup(props) {
      const previewData = ref<Object>({});
      onMounted(async () => {
        const res = await previewCodeGen(props.tableId);
        previewData.value = res;
      });
      return {
        previewData,
      };
    },
  });
</script>
