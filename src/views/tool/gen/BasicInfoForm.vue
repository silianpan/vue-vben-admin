<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>

<script lang="ts">
  import { defineComponent, nextTick, watchEffect } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { basicInfoFormSchema } from './gen.data';

  export default defineComponent({
    name: 'BasicInfoForm',
    components: { BasicForm },
    props: {
      info: { type: Object, default: () => {} },
    },
    setup(props) {
      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: basicInfoFormSchema,
        showActionButtonGroup: false,
      });

      nextTick(() => {
        watchEffect(() => {
          props.info &&
            setFieldsValue({
              ...props.info,
            });
        });
      });

      function handleSubmit() {}

      return {
        register,
        handleSubmit,
      };
    },
  });
</script>
