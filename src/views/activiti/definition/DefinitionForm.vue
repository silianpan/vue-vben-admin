<template>
  <a-upload :action="action" :headers="headers" :before-upload="beforeUpload">
    <a-button>
      <Icon icon="material-symbols:upload-rounded" />
      点击上传
    </a-button>
  </a-upload>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Upload, Button } from 'ant-design-vue';
  import { getToken } from '/@/utils/auth';
  import { getAppEnvConfig } from '/@/utils/env';
  import { useMessage } from '/@/hooks/web/useMessage';
  import Icon from '/@/components/icon';

  export default defineComponent({
    name: 'DefinitionForm',
    components: { AUpload: Upload, AButton: Button, Icon },
    setup() {
      const { createMessage } = useMessage();
      const { VITE_GLOB_API_URL } = getAppEnvConfig();
      const action = `${VITE_GLOB_API_URL}/activiti/definition/upload`;
      const headers = {
        Authorization: `Bearer ${getToken()}`,
      };
      function beforeUpload(file: any) {
        const isRightSize = file.size / 1024 / 1024 < 2;
        if (!isRightSize) {
          createMessage.error('文件大小超过 2MB');
        }
        return isRightSize;
      }

      return { action, headers, beforeUpload };
    },
  });
</script>
