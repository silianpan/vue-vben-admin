<template>
  <BasicForm @register="registerForm" />
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  /* import { getDeptList, addUser, updateUser, getUser } from '/@/api/demo/system'; */

  export default defineComponent({
    name: 'AccountForm',
    components: { BasicForm },
    emits: ['success', 'register'],
    setup() {
      const isUpdate = ref(true);
      /* const rowId = ref(''); */

      const [registerForm] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      return { registerForm, getTitle };
    },
  });
</script>
