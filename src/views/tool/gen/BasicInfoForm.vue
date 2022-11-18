<template>
  <BasicForm @register="register" @submit="handleSubmit" />
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { basicInfoFormSchema } from './gen.data';

  export default defineComponent({
    name: 'BasicInfoForm',
    components: { BasicForm },
    props: {
      record: { type: Object, default: () => {} },
    },
    setup(props) {
      const [register, { setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: basicInfoFormSchema,
        actionColOptions: {
          span: 24,
        },
      });

      onMounted(async () => {
        setFieldsValue({
          ...props.record,
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
