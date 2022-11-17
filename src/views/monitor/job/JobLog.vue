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
  import { cleanJobLog, delJobLog, getJobLogListByPage, exportJobLog } from '/@/api/demo/monitor';

  import { columns, searchFormSchema } from './job.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByUrl } from '/@/utils/file/download';
  import { getAppEnvConfig } from '/@/utils/env';

  export default defineComponent({
    name: 'JobLogManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { createConfirm, createMessage } = useMessage();
      const [registerTable, { reload, getForm }] = useTable({
        title: '任务日志列表',
        api: (info) =>
          getJobLogListByPage(info).then((res) => ({
            items: res.rows,
            total: res.total,
          })),
        beforeFetch: (info: BasicPageParams) => {
          const params = { ...getForm().getFieldsValue() };
          params['params[beginTime'] = params.beginTime;
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

      function handleClean() {
        createConfirm({
          iconType: 'warning',
          title: '清理任务日志',
          content: '是否确认清理全部任务日志？',
          onOk: async () => {
            await cleanJobLog();
            createMessage.success('清理成功');
            handleSuccess();
          },
        });
      }
      async function handleExport() {
        const res = await exportJobLog(getForm().getFieldsValue());
        const { VITE_GLOB_API_URL } = getAppEnvConfig();
        downloadByUrl({
          url: `${VITE_GLOB_API_URL}/common/download?fileName=${encodeURIComponent(
            res.msg,
          )}&delete=true`,
          fileName: res.msg,
        });
        createMessage.success('导出成功');
      }

      async function handleDelete(record: Recordable) {
        await delJobLog(record.jobLogId);
        handleSuccess();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleClean,
        handleExport,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
