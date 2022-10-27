<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :checkedKeys="checkedKeys"
          :fieldNames="{ title: 'menuName', key: 'menuId' }"
          checkable
          toolbar
          title="菜单分配"
          ref="menuTreeRef"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';

  import { addRole, getMenuList, getRoleMenuTreeSelect, updateRole } from '/@/api/demo/system';
  import { listToTree } from '/@/utils/helper/treeHelper';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);
      const checkedKeys = ref<number[]>([]);
      const menuTreeRef = ref<Nullable<TreeActionType>>(null);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = listToTree((await getMenuList()) as any as TreeItem[], {
            id: 'menuId',
            children: 'children',
            pid: 'parentId',
          });
        }
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          const { roleId } = data.record;
          const roleMenus = await getRoleMenuTreeSelect(roleId);
          checkedKeys.value = roleMenus.checkedKeys;
          data.record.menu = roleMenus.checkedKeys;
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // TODO custom api
          values.menuIds = unref(menuTreeRef)?.getCheckedKeys();
          if (!unref(isUpdate)) {
            await addRole(values);
          } else {
            await updateRole(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        checkedKeys,
        menuTreeRef,
      };
    },
  });
</script>
