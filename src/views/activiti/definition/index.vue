<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleDeploy"> 部署流程定义 </a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:deployment-unit-outlined',
              onClick: handleSuspendOrActive.bind(null, record),
              tooltip: record.suspendState === '2' ? '激活' : '挂起',
            },
            {
              icon: 'ant-design:export-outlined',
              onClick: handleConvert2Model.bind(null, record),
              tooltip: '转模型',
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
    delDefinition,
    convert2Model,
    suspendOrActiveDefinition,
    getDefinitionListByPage,
  } from '/@/api/demo/activiti';

  import DefinitionForm from './DefinitionForm.vue';

  import { columns, searchFormSchema } from './definition.data';
  import { BasicPageParams } from '/@/api/model/baseDefinition';
  import { createBasicModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'DefinitionManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { createMessage, createConfirm } = useMessage();
      const [registerTable, { reload, getForm }] = useTable({
        title: '流程定义列表',
        api: (info: any) =>
          getDefinitionListByPage(info).then((res: any) => ({
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
          width: 120,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleDeploy() {
        const obj = createBasicModal(
          {
            title: '部署流程定义',
            useWrapper: true,
            loading: true,
            showOkBtn: true,
            showCancelBtn: true,
            onOk: async () => {
              obj!.close();
              reload();
            },
          },
          {
            default: () => <DefinitionForm />,
          },
        );
        obj!.open();
      }

      async function handleSuspendOrActive(record: Recordable) {
        const stateName = record.suspendState === '2' ? '激活' : '挂起';
        createConfirm({
          iconType: 'warning',
          title: stateName,
          content: `是否确认${stateName}编号为${record.id}的流程定义?`,
          onOk: async () => {
            const { id, suspendState } = record;
            await suspendOrActiveDefinition({ id, suspendState });
            createMessage.success(`${stateName}成功`);
            handleSuccess();
          },
        });
      }

      async function handleConvert2Model(record: Recordable) {
        createConfirm({
          iconType: 'warning',
          title: '转模型',
          content: `是否确认将编号为${record.id}的流程定义转为流程模型?`,
          onOk: async () => {
            await convert2Model({ processDefinitionId: record.id });
            createMessage.success('转模型成功');
            handleSuccess();
          },
        });
      }

      async function handleDelete(record: Recordable) {
        await delDefinition(record.deploymentId);
        handleSuccess();
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleDeploy,
        handleSuspendOrActive,
        handleConvert2Model,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
