<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleCreate"> 创建新模型 </a-button>
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
              icon: 'ant-design:deployment-unit-outlined',
              onClick: handleDeploy.bind(null, record),
              tooltip: '部署',
            },
            {
              icon: 'ant-design:export-outlined',
              onClick: handleExport.bind(null, record),
              tooltip: '导出',
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
  import { delModel, deployModel, exportModel, getModelListByPage } from '/@/api/demo/activiti';

  import { DrawerFooterAction } from '/@/components/Drawer';
  import ModelForm from './ModelForm.vue';

  import { columns, searchFormSchema } from './model.data';
  import { BasicPageParams } from '/@/api/model/baseModel';
  import { createBasicModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getAppEnvConfig } from '/@/utils/env';
  import { openWindow } from '/@/utils';
  import { formatToDate } from '/@/utils/dateUtil';
  import { downloadByData } from '/@/utils/file/download';

  export default defineComponent({
    name: 'ModelManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { createMessage, createConfirm } = useMessage();
      const [registerTable, { reload, getForm }] = useTable({
        title: '模型列表',
        api: (info) =>
          getModelListByPage(info).then((res) => ({
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
          width: 200,
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
            title: '新增模型',
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
            default: () => <ModelForm isUpdate={false} ref={formRef} />,
          },
        );
        obj!.open();
      }

      function handleEdit(record: Recordable) {
        const { VITE_GLOB_FLOW_URL } = getAppEnvConfig();
        openWindow(`${VITE_GLOB_FLOW_URL}/modeler/modeler.html?modelId=${record.id}`);
      }

      async function handleDeploy(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          title: '部署',
          content: `是否确认部署编号为${record.id}的模型?`,
          onOk: async () => {
            await deployModel(record.id);
            createMessage.success('部署成功');
          },
        });
      }

      async function handleExport(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          title: '导出',
          content: `是否确认导出编号为${record.id}的模型?`,
          onOk: async () => {
            const res = await exportModel(record.id);
            downloadByData(res, `流程模型-${formatToDate(new Date())}.bpmn`);
          },
        });
      }

      function handleDelete(record: Recordable) {
        delModel(record.modelId).then((_) => {
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
        handleDeploy,
        handleExport,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
