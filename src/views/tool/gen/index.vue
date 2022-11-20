<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleCreate"> 导入 </a-button>
      <a-button type="primary" @click="handleCreate"> 生成 </a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:eye-outlined',
              onClick: handlePreview.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="tsx">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { delCodeGen, getCodeGenListByPage } from '/@/api/demo/monitor';

  import { columns, searchFormSchema } from './gen.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { router } from '/@/router';
  import { createBasicDrawer } from '/@/components/Drawer';
  import PreviewCode from './PreviewCode.vue';

  export default defineComponent({
    name: 'CodeGenManagement',
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { reload, getForm }] = useTable({
        title: '代码生成列表',
        api: (info) =>
          getCodeGenListByPage(info).then((res) => ({
            items: res.rows,
            total: res.total,
          })),
        beforeFetch: (info: BasicPageParams) => {
          const params = { ...getForm().getFieldsValue() };
          params['params[beginTime]'] = params.beginTime;
          params['params[endTime]'] = params.endTime;
          return {
            pageNum: info.page,
            pageSize: info.pageSize,
            ...params,
          };
        },
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {}
      async function handlePreview({ tableId }) {
        const obj = createBasicDrawer(
          {
            title: '预览代码',
            width: '80%',
            showOkBtn: false,
          },
          {
            default: () => <PreviewCode tableId={tableId} />,
          },
        );
        obj!.open();
      }

      function handleEdit(record: Recordable) {
        router.push('/other/gen/edit/' + record.tableId);
      }

      async function handleDelete(record: Recordable) {
        await delCodeGen(record.tableId);
        handleSuccess();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handlePreview,
      };
    },
  });
</script>
