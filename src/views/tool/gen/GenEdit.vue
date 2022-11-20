<template>
  <a-card :bordered="false">
    <a-tabs v-model:activeKey="activeKey" style="margin-bottom: 56px">
      <a-tab-pane key="1" tab="基本信息" force-render>
        <BasicInfoForm ref="basicInfoFormRef" :info="info" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="字段信息" force-render>
        <FieldInfoTable ref="fieldInfoTableRef" :rows="rows" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="生成信息" force-render>
        <GenInfoForm ref="genInfoFormRef" :info="info" :tables="tables" />
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
  import { defineComponent, ref, onMounted, unref } from 'vue';
  import { Button, Space } from 'ant-design-vue';
  import FooterToolbar from '/@/components/FooterToolbar/index.vue';
  import BasicInfoForm from './BasicInfoForm.vue';
  import FieldInfoTable from './FieldInfoTable.vue';
  import GenInfoForm from './GenInfoForm.vue';

  import { getCodeGenTable, updateCodeGen } from '/@/api/demo/monitor';
  import {
    CodeGenTableItem,
    CodeGenInfoItem,
    CodeGenRowItem,
  } from '/@/api/demo/model/monitorModel';

  import { Tabs, TabPane, Card } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { cloneDeep } from 'lodash-es';

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
      const basicInfoFormRef = ref();
      const fieldInfoTableRef = ref();
      const genInfoFormRef = ref();
      const { createMessage } = useMessage();

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

      async function handleSubmit() {
        const basicInfo = await unref(basicInfoFormRef).handleSubmit();
        const genInfo = await unref(genInfoFormRef).handleSubmit();
        const fieldInfoTable = await unref(fieldInfoTableRef).handleSubmit();
        const params = { ...basicInfo, ...genInfo };
        const fieldInfoCopy = cloneDeep(fieldInfoTable);
        fieldInfoCopy.forEach((e: any) => {
          e.isInsert = e.isInsert ? '1' : '0';
          e.isEdit = e.isEdit ? '1' : '0';
          e.isList = e.isList ? '1' : '0';
          e.isQuery = e.isQuery ? '1' : '0';
          e.isRequired = e.isRequired ? '1' : '0';
        });
        params.columns = fieldInfoCopy;
        params.params = {
          treeCode: params.treeCode,
          treeName: params.treeName,
          treeParentCode: params.treeParentCode,
          parentMenuId: params.parentMenuId,
        };
        await updateCodeGen(params);
        createMessage.success('更新成功');
        await handleCancel();
      }
      async function handleCancel() {}

      return {
        activeKey: ref('2'),
        rows,
        info,
        tables,
        handleSubmit,
        handleCancel,
        basicInfoFormRef,
        fieldInfoTableRef,
        genInfoFormRef,
      };
    },
  });
</script>
