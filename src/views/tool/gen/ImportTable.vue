<template>
  <BasicTable @register="registerTable" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { getDbTableListByPage } from '/@/api/demo/monitor';
  import { columnsImportTable, searchFormSchemaImportTable } from './gen.data';
  import { CodeGenTableItem } from '/@/api/demo/model/monitorModel';

  export default defineComponent({
    name: 'ImportTable',
    components: { BasicTable },
    setup() {
      const [registerTable, { getForm, getSelectRows }] = useTable({
        title: '表列表',
        api: (info: any) =>
          getDbTableListByPage(info).then((res: any) => ({
            items: res.rows,
            total: res.total,
          })),
        beforeFetch: (info: BasicPageParams) => {
          return {
            pageNum: info.page,
            pageSize: info.pageSize,
            ...getForm().getFieldsValue(),
          };
        },
        columns: columnsImportTable,
        formConfig: {
          labelWidth: 60,
          schemas: searchFormSchemaImportTable,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        rowSelection: {
          type: 'checkbox',
        },
      });

      function handleSubmit() {
        const selectRows = getSelectRows();
        const selectTableNames = selectRows.map((item: CodeGenTableItem) => item.tableName);
        const tableNames = selectTableNames.join();
        return tableNames;
      }

      return {
        registerTable,
        handleSubmit,
      };
    },
  });
</script>
