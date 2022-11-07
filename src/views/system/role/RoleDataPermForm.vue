<template>
  <BasicForm @register="registerForm">
    <template #deptIds="{ model, field }">
      <BasicTree
        v-show="isShowDeptTree"
        v-model:value="model[field]"
        :treeData="treeData"
        :checkedKeys="checkedKeys"
        :fieldNames="{ title: 'label', key: 'id' }"
        checkable
        toolbar
        title="数据权限"
        ref="deptTreeRef"
      />
    </template>
  </BasicForm>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { RoleDataPermFormSchema } from './role.data';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';

  import { getRoleDeptTreeSelect, setRoleDataScope } from '/@/api/demo/system';
  import { listToTree } from '/@/utils/helper/treeHelper';

  export default defineComponent({
    name: 'RoleDataPermForm',
    components: { BasicForm, BasicTree },
    props: {
      record: { type: Object, default: () => {} },
    },
    setup(props) {
      const isShowDeptTree = ref<boolean>(props.record.dataScope === '2');
      const treeData = ref<TreeItem[]>([]);
      const checkedKeys = ref<number[]>([]);
      const deptTreeRef = ref<Nullable<TreeActionType>>(null);

      const [registerForm, { updateSchema, resetFields, validate, setFieldsValue }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: RoleDataPermFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      onMounted(async () => {
        resetFields();

        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          const { roleId } = props.record;
          const rdts = await getRoleDeptTreeSelect(roleId);
          checkedKeys.value = rdts.checkedKeys;
          treeData.value = listToTree(rdts.depts as any as TreeItem[], {
            id: 'id',
            children: 'children',
            pid: 'parentId',
          });
        }

        updateSchema([
          {
            field: 'dataScope',
            componentProps: {
              onChange: (e: any) => {
                isShowDeptTree.value = e === '2';
              },
            },
          },
        ]);

        setFieldsValue({
          ...props.record,
        });
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          if (isShowDeptTree.value) {
            values.deptIds = unref(deptTreeRef)?.getCheckedKeys();
          }
          await setRoleDataScope(values);
        } finally {
        }
      }
      return { registerForm, handleSubmit, treeData, checkedKeys, deptTreeRef, isShowDeptTree };
    },
  });
</script>
