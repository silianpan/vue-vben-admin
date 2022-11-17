<template>
  <FramePage :frameSrc="src" />
</template>

<script setup lang="ts">
  import FramePage from '/@/views/sys/iframe/index.vue';
  import { getAppEnvConfig } from '/@/utils/env';

  const { VITE_GLOB_API_URL } = getAppEnvConfig();
  const src = VITE_GLOB_API_URL + '/doc.html';
</script>
