<template>
  <BasicForm @register="register" @submit="handleSubmit" />
  <a-divider orientation="left">其他信息</a-divider>
  <BasicForm @register="registerOther" @submit="handleSubmitOther" />
  <a-divider orientation="left">关联信息</a-divider>
  <BasicForm @register="registerRela" @submit="handleSubmitRela" />
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { Divider } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { genInfoFormSchema, otherInfoFormSchema, relaInfoFormSchema } from './gen.data';

  export default defineComponent({
    name: 'GenInfoForm',
    components: { BasicForm, ADivider: Divider },
    props: {
      record: { type: Object, default: () => {} },
    },
    setup(props) {
      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: genInfoFormSchema,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerOther, { setFieldsValue: setFieldsValueOther }] = useForm({
        labelWidth: 120,
        schemas: otherInfoFormSchema,
        actionColOptions: {
          span: 24,
        },
      });
      const [registerRela, { setFieldsValue: setFieldsValueRela }] = useForm({
        labelWidth: 120,
        schemas: relaInfoFormSchema,
        actionColOptions: {
          span: 24,
        },
      });

      onMounted(async () => {
        setFieldsValue({
          ...props.record,
        });
        setFieldsValueOther({
          ...props.record,
        });
        setFieldsValueRela({
          ...props.record,
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
