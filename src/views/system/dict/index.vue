<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleCreate"> 新增字典 </a-button>
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
  import { defineComponent, ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { delDictType, getDictTypeListByPage } from '/@/api/demo/system';

  import { DrawerFooterAction } from '/@/components/Drawer';
  import DictTypeForm from './DictTypeForm.vue';

  import { columns, searchFormSchema } from './dict.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { createBasicModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'PostManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { createMessage } = useMessage();
      const [registerTable, { reload, getForm }] = useTable({
        title: '字典列表',
        api: (info) =>
          getDictTypeListByPage(info).then((res) => ({
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
        const formRef = ref<Nullable<DrawerFooterAction>>(null);
        const obj = createBasicModal(
          {
            title: '新增字典',
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
            default: () => <DictTypeForm isUpdate={false} ref={formRef} />,
          },
        );
        obj!.open();
      }

      function handleEdit(record: Recordable) {
        const formRef = ref<Nullable<DrawerFooterAction>>(null);
        const obj = createBasicModal(
          {
            title: '编辑字典',
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
            default: () => <DictTypeForm record={record} isUpdate ref={formRef} />,
          },
        );
        obj!.open();
      }

      function handleDelete(record: Recordable) {
        delDictType(record.postId).then((_) => {
          handleSuccess();
        });
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
      };
    },
  });
</script>
