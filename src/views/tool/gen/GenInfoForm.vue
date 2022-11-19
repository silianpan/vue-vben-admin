<template>
  <BasicForm @register="register" @submit="handleSubmit" />
  <a-divider orientation="left">其他信息</a-divider>
  <BasicForm @register="registerOther" @submit="handleSubmitOther" />
  <a-divider orientation="left">关联信息</a-divider>
  <BasicForm @register="registerRela" @submit="handleSubmitRela" />
</template>

<script lang="ts">
  import { defineComponent, nextTick, watchEffect } from 'vue';
  import { Divider } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { genInfoFormSchema, otherInfoFormSchema, relaInfoFormSchema } from './gen.data';

  export default defineComponent({
    name: 'GenInfoForm',
    components: { BasicForm, ADivider: Divider },
    props: {
      info: { type: Object, default: () => {} },
      tables: { type: Array, default: () => [] },
    },
    setup(props) {
      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: genInfoFormSchema,
        showActionButtonGroup: false,
      });
      const [registerOther, { setFieldsValue: setFieldsValueOther }] = useForm({
        labelWidth: 120,
        schemas: otherInfoFormSchema,
        showActionButtonGroup: false,
      });
      const [registerRela, { setFieldsValue: setFieldsValueRela }] = useForm({
        labelWidth: 120,
        schemas: relaInfoFormSchema,
        showActionButtonGroup: false,
      });

      nextTick(() => {
        watchEffect(() => {
          if (props.info) {
            setFieldsValue({
              ...props.info,
            });
            setFieldsValueOther({
              ...props.info,
            });
            setFieldsValueRela({
              ...props.info,
            });
          }
        });
      });

      function handleSubmit() {}
      function handleSubmitOther() {}
      function handleSubmitRela() {}

      return {
        register,
        registerOther,
        registerRela,
        handleSubmit,
        handleSubmitOther,
        handleSubmitRela,
      };
    },
  });
</script>
