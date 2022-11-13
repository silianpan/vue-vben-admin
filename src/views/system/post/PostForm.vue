<template>
  <BasicForm @register="registerForm" />
</template>
<script lang="ts">
  import { defineComponent, ref, unref, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './post.data';
  import { addPost, updatePost } from '/@/api/demo/system';

  export default defineComponent({
    name: 'PostForm',
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
            await addPost(values);
          } else {
            await updatePost(values);
          }
        } finally {
        }
      }

      return { registerForm, handleSubmit };
    },
  });
</script>
