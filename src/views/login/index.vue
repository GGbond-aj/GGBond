<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/home');
};
</script>

<template>
  <div>
    <div>
      hello world
    </div>
    <div style="cursor: pointer; color: #42b983;" @click="goHome">
      跳转到home
    </div>
  </div>
</template>

<style scoped>
</style>
