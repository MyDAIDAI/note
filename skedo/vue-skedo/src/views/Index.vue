<script setup lang="ts">
</script>

<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header"></a-layout-header>
    <a-layout>
      <a-layout-sider class="layout-sider" width="250px">组件库</a-layout-sider>
      <a-layout-content class="layout-content">画布</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}

.layout-header {
  background-color: #fff;
}

.layout-sider {
  background-color: #fff;
  margin-top: 10px;
}

.layout-content {
  margin-top: 10px;
  margin-left: 10px;
  background-color: #fff;
}
</style>