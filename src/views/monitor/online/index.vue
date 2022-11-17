<template>
  <BasicTable @register="registerTable">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:logout-outlined',
              tooltip: '强退',
              popConfirm: {
                title: '是否确认强退',
                placement: 'left',
                confirm: handleForceLogout.bind(null, record),
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
  import { forceLogoutOnline, getOnlineListByPage } from '/@/api/demo/monitor';

  import { columns, searchFormSchema } from './online.data';
  import { BasicPageParams } from '/@/api/model/baseModel';

  export default defineComponent({
    name: 'OnlineManagement',
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable, { reload, getForm }] = useTable({
        title: '登录日志列表',
        api: (info) =>
          getOnlineListByPage(info).then((res) => ({
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

      async function handleForceLogout(record: Recordable) {
        await forceLogoutOnline(record.tokenId);
        handleSuccess();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleForceLogout,
        handleSuccess,
      };
    },
  });
</script>
