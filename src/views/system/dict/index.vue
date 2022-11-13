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
    <template #expandedRowRender="{ record }">
      <BasicTable
        style="padding: 10px"
        :api="() => listDictData(record)"
        :columns="columnsDictData"
        rowKey="dictCode"
        :pagination="false"
        :showIndexColumn="false"
        :actionColumn="{
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: undefined,
        }"
      >
        <template #toolbar>
          <a-button type="primary" @click="handleCreateDictData(record)">新增字典数据</a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  onClick: handleEditDictData.bind(null, record),
                },
                {
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  popConfirm: {
                    title: '是否确认删除',
                    placement: 'left',
                    confirm: handleDeleteDictData.bind(null, record),
                  },
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
    </template>
  </BasicTable>
</template>
<script lang="tsx">
  import { defineComponent, ref, unref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    delDictType,
    getDictTypeListByPage,
    getDictDataList,
    delDictData,
  } from '/@/api/demo/system';

  import { DrawerFooterAction } from '/@/components/Drawer';
  import DictTypeForm from './DictTypeForm.vue';
  import DictDataForm from './DictDataForm.vue';

  import { columns, searchFormSchema, columnsDictData } from './dict.data';
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

      async function listDictData(record: Recordable) {
        return getDictDataList(record.dictType).then((res) => ({
          items: res,
        }));
      }

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
        delDictType(record.dictId).then((_) => {
          handleSuccess();
        });
      }

      function handleSuccess() {
        reload();
      }

      function handleCreateDictData(dictTypeRecord: Recordable) {
        const formRef = ref<Nullable<DrawerFooterAction>>(null);
        const obj = createBasicModal(
          {
            title: '新增字典数据',
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
            default: () => (
              <DictDataForm
                record={{ dictType: dictTypeRecord.dictType }}
                isUpdate={false}
                ref={formRef}
              />
            ),
          },
        );
        obj!.open();
      }

      function handleEditDictData(record: Recordable) {
        const formRef = ref<Nullable<DrawerFooterAction>>(null);
        const obj = createBasicModal(
          {
            title: '编辑字典数据',
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
            default: () => <DictDataForm record={record} isUpdate ref={formRef} />,
          },
        );
        obj!.open();
      }

      function handleDeleteDictData(record: Recordable) {
        delDictData(record.dictCode).then((_) => {
          handleSuccessDictData();
        });
      }

      function handleSuccessDictData() {
        reload();
      }

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleCreateDictData,
        handleEditDictData,
        handleDeleteDictData,
        handleSuccess,
        handleSuccessDictData,
        columnsDictData,
        listDictData,
      };
    },
  });
</script>
