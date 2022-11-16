<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" danger @click="handleClean"> 清空 </a-button>
      <a-button type="primary" @click="handleExport"> 导出 </a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:eye-outlined',
              onClick: handleDetail.bind(null, record),
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
  import {
    cleanOperlog,
    delOperlog,
    getOperlogListByPage,
    exportOperlog,
  } from '/@/api/demo/monitor';

  import OperlogDetail from './OperlogDetail.vue';

  import { columns, searchFormSchema } from './operlog.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByUrl } from '/@/utils/file/download';
  import { createBasicDrawer } from '/@/components/Drawer';
  import { getAppEnvConfig } from '/@/utils/env';

  export default defineComponent({
    name: 'OperlogManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { createConfirm, createMessage } = useMessage();
      const [registerTable, { reload, getForm }] = useTable({
        title: '操作日志列表',
        api: (info) =>
          getOperlogListByPage(info).then((res) => ({
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

      function handleClean() {
        createConfirm({
          iconType: 'warning',
          title: '清理操作日志',
          content: '是否确认清理全部操作日志？',
          onOk: async () => {
            await cleanOperlog();
            createMessage.success('清理成功');
            handleSuccess();
          },
        });
      }
      function handleExport() {
        exportOperlog(getForm().getFieldsValue()).then((res) => {
          console.log('res:', res);
          const { VITE_GLOB_API_URL } = getAppEnvConfig();
          downloadByUrl({
            url: `${VITE_GLOB_API_URL}/common/download?fileName=${encodeURIComponent(
              res.msg,
            )}&delete=true`,
            fileName: res.msg,
          });
          createMessage.success('导出成功');
        });
      }

      function handleDetail(record: Recordable) {
        const obj = createBasicDrawer(
          {
            width: '50%',
            title: '操作日志详情',
          },
          {
            default: () => <OperlogDetail record={record} />,
          },
        );
        obj!.open();
      }

      function handleDelete(record: Recordable) {
        delOperlog(record.operId).then((_) => {
          handleSuccess();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleClean,
        handleExport,
        handleDetail,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
