<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
        <a-button type="primary" @click="handleCreateBasicDrawer">函数式Drawer</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              // {
              //   icon: 'clarity:info-standard-line',
              //   tooltip: '查看用户详情',
              //   onClick: handleView.bind(null, record),
              // },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'clarity:key-line',
                tooltip: '重置密码',
                onClick: handleResetPwd.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
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
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <ResetPwdModal @register="registerModalResetPwd" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="tsx">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { delUser, getAccountList } from '/@/api/demo/system';
  import { PageWrapper } from '/@/components/Page';
  import DeptTree from './DeptTree.vue';

  import { useModal } from '/@/components/Modal';
  import AccountModal from './AccountModal.vue';
  import ResetPwdModal from './ResetPwdModal.vue';
  import AccountForm from './AccountForm.vue';

  import { columns, searchFormSchema } from './account.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { createBasicDrawer } from '/@/components/Drawer';
  import Button, { ButtonGroup } from 'ant-design-vue/es/button';

  export default defineComponent({
    name: 'AccountManagement',
    components: { BasicTable, PageWrapper, DeptTree, AccountModal, ResetPwdModal, TableAction },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerModalResetPwd, { openModal: openModalResetPwd }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const [registerTable, { reload, updateTableDataRecord, getForm }] = useTable({
        title: '账号列表',
        api: (info) =>
          getAccountList(info).then((res) => ({
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
        rowKey: 'userId',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        handleSearchInfoFn(info) {
          console.log('handleSearchInfoFn', info);
          return info;
        },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleCreateBasicDrawer() {
        const obj = createBasicDrawer(
          {
            width: '50%',
            onClose: (e?: Event) => {
              console.log('onClose', e);
            },
            onOk: (e?: Event) => {
              console.log('onOk', e);
            },
          },
          {
            title: () => '新增用户',
            default: () => <AccountForm />,
            titleToolbar: () => (
              <ButtonGroup>
                <Button type="primary">新增</Button>
                <Button danger>删除</Button>
              </ButtonGroup>
            ),
          },
        );
        obj!.open();
      }

      function handleEdit(record: Recordable) {
        // console.log(record);
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleResetPwd(record: Recordable) {
        openModalResetPwd(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        console.log(record);
        delUser(record.userId).then((_) => {
          handleSuccess({ isUpdate: false, values: record });
        });
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新内部数据。
          // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log(result);
        } else {
          reload();
        }
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      // function handleView(record: Recordable) {
      //   go('/system/account_detail/' + record.id);
      // }

      return {
        registerTable,
        registerModal,
        registerModalResetPwd,
        handleCreate,
        handleCreateBasicDrawer,
        handleEdit,
        handleResetPwd,
        handleDelete,
        handleSuccess,
        handleSelect,
        searchInfo,
      };
    },
  });
</script>
