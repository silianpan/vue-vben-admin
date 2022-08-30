<template>
  <BasicForm @register="registerForm" />
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { getDeptList, getUser } from '/@/api/demo/system';

  export default defineComponent({
    name: 'AccountForm',
    components: { BasicForm },
    props: {
      isUpdate: { type: Boolean, default: false },
      record: { type: Object, default: () => {} },
    },
    emits: ['success', 'register'],
    setup(props) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { updateSchema, resetFields, setFieldsValue }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      onMounted(async () => {
        resetFields();
        isUpdate.value = !!props?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = props.record.userId;
          const user = await getUser(props.record.userId);
          setFieldsValue({
            ...user,
            roleIds: user.roles?.map((item) => item.roleId),
            postIds: user.posts?.map((item) => item.postId),
          });
        }

        /* 部门树 */
        const treeData = await getDeptList();
        updateSchema([
          {
            field: 'password',
            show: !unref(isUpdate),
          },
          {
            field: 'deptId',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      return { registerForm, getTitle };
    },
  });
</script>
