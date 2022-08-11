<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { resetPwdFormSchema } from './account.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { resetUserPwd } from '/@/api/demo/system';

  export default defineComponent({
    name: 'ResetPwdModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();

      const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: resetPwdFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        setFieldsValue({
          ...data.record,
        });
      });

      const getTitle = '重置密码';

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (values.newPassword !== values.confirmPassword) {
            return createMessage.error('密码不一致');
          }
          const res = await resetUserPwd(values.userId, values.newPassword);
          closeModal();
          createMessage.success(res['msg']);
          emit('success', { isUpdate: false });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
