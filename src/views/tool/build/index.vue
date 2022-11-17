<template>
  <Result status="success" title="程序员正在加速开发中">
    <template #extra>
      <a-button key="home" type="primary" @click="handleHomeClick">返回首页</a-button>
    </template>
  </Result>
</template>

<script setup lang="ts">
  import { PageEnum } from '/@/enums/pageEnum';
  import { useGo } from '/@/hooks/web/usePage';
  import { useUserStore } from '/@/store/modules/user';
  import { Result } from 'ant-design-vue';

  const userStore = useUserStore();
  const go = useGo();
  const handleHomeClick = () => {
    go(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
  };
</script>
