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
            {
              icon: 'material-symbols:sync',
              onClick: handleSyncDb.bind(null, record),
              tooltip: '同步',
            },
            {
              icon: 'material-symbols:code',
              onClick: handleGenCode.bind(null, record),
              tooltip: '生成代码',
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
  import {
    delCodeGen,
    getCodeGenListByPage,
    syncDbCodeGen,
    genCode,
    genCodeZip,
  } from '/@/api/demo/monitor';

  import { columns, searchFormSchema } from './gen.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { router } from '/@/router';
  import { createBasicDrawer } from '/@/components/Drawer';
  import PreviewCode from './PreviewCode.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByData } from '/@/utils/file/download';

  export default defineComponent({
    name: 'CodeGenManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { createConfirm, createMessage } = useMessage();
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
          width: 160,
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

      async function handleSyncDb({ tableName }) {
        createConfirm({
          iconType: 'warning',
          title: '确认强制同步数据?',
          content: '当前同步表名为' + tableName + '的数据',
          onOk: async () => {
            await syncDbCodeGen(tableName);
            createMessage.success('同步成功');
            handleSuccess();
          },
        });
      }
      async function handleGenCode(record: Recordable) {
        const tableNames = record.tableName;
        if (!tableNames) {
          return createMessage.error('请选择要生成的数据');
        }
        if (record.genType === '1') {
          await genCode(record.tableName);
          createMessage.success('成功生成到自定义路径：' + record.genPath);
        } else {
          const res = await genCodeZip(tableNames);
          downloadByData(res, 'seal.zip', 'zip');
          createMessage.success('导出成功');
        }
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
        handleSyncDb,
        handleGenCode,
      };
    },
  });
</script>
