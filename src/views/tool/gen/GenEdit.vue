<template>
  <a-card :bordered="false">
    <a-tabs v-model:activeKey="activeKey" style="margin-bottom: 56px">
      <a-tab-pane key="1" tab="基本信息" force-render>
        <BasicInfoForm :info="info" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="字段信息" force-render>
        <FieldInfoTable :rows="rows" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="生成信息" force-render>
        <GenInfoForm :info="info" :tables="tables" />
      </a-tab-pane>
    </a-tabs>
    <FooterToolbar>
      <a-space>
        <a-button type="primary" @click="handleSubmit"> 保存 </a-button>
        <a-button type="dashed" @click="handleCancel"> 取消 </a-button>
      </a-space>
    </FooterToolbar>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Button, Space } from 'ant-design-vue';
  import FooterToolbar from '/@/components/FooterToolbar/index.vue';
  import BasicInfoForm from './BasicInfoForm.vue';
  import FieldInfoTable from './FieldInfoTable.vue';
  import GenInfoForm from './GenInfoForm.vue';

  import { getCodeGenTable } from '/@/api/demo/monitor';
  import {
    CodeGenTableItem,
    CodeGenInfoItem,
    CodeGenRowItem,
  } from '/@/api/demo/model/monitorModel';

  import { Tabs, TabPane, Card } from 'ant-design-vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'GenEdit',
    components: {
      BasicInfoForm,
      FieldInfoTable,
      GenInfoForm,
      FooterToolbar,
      ATabs: Tabs,
      ATabPane: TabPane,
      ACard: Card,
      AButton: Button,
      ASpace: Space,
    },
    setup() {
      const route = useRoute();
      const rows = ref<CodeGenRowItem[]>();
      const info = ref<CodeGenInfoItem>();
      const tables = ref<CodeGenTableItem[]>();

      onMounted(async () => {
        const res = await getCodeGenTable(route.params?.tableId + '');
        console.log('res', res);
        res.rows.forEach((e: any) => {
          e.isInsert = e.isInsert === '1';
          e.isEdit = e.isEdit === '1';
          e.isList = e.isList === '1';
          e.isQuery = e.isQuery === '1';
          e.isRequired = e.isRequired === '1';
        });
        rows.value = res.rows;
        info.value = res.info;
        tables.value = res.tables;
      });

      async function handleSubmit() {}
      async function handleCancel() {}

      return {
        activeKey: ref('2'),
        rows,
        info,
        tables,
        handleSubmit,
        handleCancel,
      };
    },
  });
</script>
