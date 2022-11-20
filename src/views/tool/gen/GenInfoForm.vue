<template>
  <BasicForm @register="register" />
  <a-divider orientation="left">其他信息</a-divider>
  <BasicForm @register="registerOther" />
  <a-divider orientation="left">关联信息</a-divider>
  <BasicForm @register="registerRela" />
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
      const [register, { setFieldsValue, validate }] = useForm({
        labelWidth: 120,
        schemas: genInfoFormSchema,
        showActionButtonGroup: false,
      });
      const [registerOther, { setFieldsValue: setFieldsValueOther, validate: validateOther }] =
        useForm({
          labelWidth: 120,
          schemas: otherInfoFormSchema,
          showActionButtonGroup: false,
        });
      const [registerRela, { setFieldsValue: setFieldsValueRela, validate: validateRela }] =
        useForm({
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

      async function handleSubmit() {
        const res = await validate();
        const resOther = await validateOther();
        const resRela = await validateRela();
        return {
          ...res,
          ...resOther,
          ...resRela,
        };
      }

      return {
        register,
        registerOther,
        registerRela,
        handleSubmit,
      };
    },
  });
</script>
