<template>
  <BasicForm @register="registerForm" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './model.data';
  import { addModel } from '/@/api/demo/activiti';

  export default defineComponent({
    name: 'ModelForm',
    components: { BasicForm },
    setup() {
      const [registerForm, { validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          // TODO custom api
          await addModel(values);
        } finally {
        }
      }

      return { registerForm, handleSubmit };
    },
  });
</script>
