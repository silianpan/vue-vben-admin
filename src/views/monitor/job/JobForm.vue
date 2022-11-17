<template>
  <BasicForm @register="registerForm" />
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './job.data';
  import { addJob, updateJob } from '/@/api/demo/monitor';

  export default defineComponent({
    name: 'JobForm',
    components: { BasicForm },
    props: {
      isUpdate: { type: Boolean, default: false },
      record: { type: Object, default: () => {} },
    },
    setup(props) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        resetFields();
        isUpdate.value = !!props?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...props.record,
          });
        }
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          // TODO custom api
          if (!unref(isUpdate)) {
            await addJob(values);
          } else {
            await updateJob(values);
          }
        } finally {
        }
      }

      return { registerForm, handleSubmit };
    },
  });
</script>
