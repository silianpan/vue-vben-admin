<template>
  <BasicTable
    title="表列表"
    ref="tableRef"
    :api="api"
    :columns="columnsImportTable"
    :formConfig="{
      labelWidth: 60,
      schemas: searchFormSchemaImportTable,
    }"
    useSearchForm
    showTableSetting
    bordered
    :showIndexColumn="false"
    :rowSelection="{ type: 'checkbox' }"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { getDbTableListByPage } from '/@/api/demo/monitor';
  import { columnsImportTable, searchFormSchemaImportTable } from './gen.data';
  import { CodeGenTableItem } from '/@/api/demo/model/monitorModel';

  export default defineComponent({
    name: 'ImportTableTemplate',
    components: { BasicTable },
    setup() {
      const tableRef = ref();

      const api = (info: any) =>
        getDbTableListByPage(info).then((res: any) => ({
          items: res.rows,
          total: res.total,
        }));
      const beforeFetch = (info: BasicPageParams) => {
        return {
          pageNum: info.page,
          pageSize: info.pageSize,
          ...unref(tableRef).getForm().getFieldsValue(),
        };
      };

      function handleSubmit() {
        const selectRows = unref(tableRef).getSelectRows();
        const selectTableNames = selectRows.map((item: CodeGenTableItem) => item.tableName);
        const tableNames = selectTableNames.join();
        return tableNames;
      }

      return {
        tableRef,
        api,
        beforeFetch,
        columnsImportTable,
        searchFormSchemaImportTable,
        handleSubmit,
      };
    },
  });
</script>
