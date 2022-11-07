<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'clarity:lock-line',
                onClick: handleEditDataScope.bind(null, record),
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
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { delRole, getRoleListByPage } from '/@/api/demo/system';

  import { DrawerFooterAction, useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';
  import RoleDataPermForm from './RoleDataPermForm.vue';

  import { columns, searchFormSchema } from './role.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { createBasicModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, getForm }] = useTable({
        title: '角色列表',
        api: (info) =>
          getRoleListByPage(info).then((res) => ({
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

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleEditDataScope(record: Recordable) {
        const formRef = ref<Nullable<DrawerFooterAction>>(null);
        const obj = createBasicModal(
          {
            helpMessage: ['提示1', '提示2'],
            title: '新增用户',
            useWrapper: true,
            loading: true,
            showOkBtn: true,
            showCancelBtn: true,
            onClose: () => {},
            onOk: async () => {
              // 调用提交
              await unref(formRef)?.handleSubmit();
              // 关闭drawer
              obj!.close();
              // 提示成功
              createMessage.success('新增成功');
              // 刷新表格
              reload();
            },
          },
          {
            default: () => <RoleDataPermForm record={record} ref={formRef} />,
          },
        );
        obj!.open();
      }

      function handleDelete(record: Recordable) {
        delRole(record.roleId).then((_) => {
          handleSuccess();
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleEditDataScope,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
