<template>
  <BasicForm @register="register" />
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
      const [register, { setFieldsValue, validate }] = useForm({
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

      async function handleSubmit() {
        return await validate();
      }

      return {
        register,
        handleSubmit,
      };
    },
  });
</script>
