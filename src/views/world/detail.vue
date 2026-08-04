<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getHikingRoute } from '../../data/hikingRoutes';

const route = useRoute();
const router = useRouter();
const trail = computed(() => getHikingRoute(String(route.params.slug)));
</script>

<template>
  <main v-if="trail" class="detail-page">
    <section class="hero" :style="{ backgroundImage: `linear-gradient(90deg,#102b2bd9 0%,#102b2b66 60%,#102b2b22),url(${trail.image})` }"><button @click="router.push('/world')">← 全部路线</button><div><p>{{ trail.region }}</p><h1>{{ trail.name }}</h1><span>{{ trail.summary }}</span></div></section>
    <section class="content"><div class="metrics"><article><b>{{ trail.distance }}</b><span>推荐距离</span></article><article><b>{{ trail.duration }}</b><span>建议天数</span></article><article><b>{{ trail.difficulty }}</b><span>难度等级</span></article><article><b>{{ trail.season }}</b><span>适合季节</span></article></div><div class="columns"><article><p class="label">ROUTE HIGHLIGHTS</p><h2>沿途风景</h2><ul><li v-for="item in trail.highlights" :key="item">{{ item }}</li></ul></article><article><p class="label">BEFORE YOU GO</p><h2>出发前提醒</h2><ul><li v-for="item in trail.tips" :key="item">{{ item }}</li></ul></article></div></section>
  </main>
  <main v-else class="not-found"><h1>这条路线还在云雾中</h1><button @click="router.push('/world')">返回路线列表</button></main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;600;800&display=swap');
.detail-page{min-height:100vh;background:#f6f0dd;color:#1e423d;font-family:'Noto Sans SC',sans-serif}.hero{min-height:570px;padding:34px clamp(24px,9vw,145px);background-position:center;background-size:cover;color:#fff9dc;display:flex;flex-direction:column;justify-content:space-between}.hero button,.not-found button{align-self:flex-start;border:1px solid #fff1b5;border-radius:99px;padding:10px 16px;background:#173e3ebd;color:#fff8d8;cursor:pointer}.hero div{max-width:690px;margin-bottom:60px}.hero p,.label{color:#f5cb5a;letter-spacing:2px;font-weight:800;font-size:11px}.hero h1{margin:8px 0 16px;font:clamp(48px,7vw,88px) 'ZCOOL KuaiLe'}.hero span{line-height:1.9}.content{max-width:1100px;margin:-45px auto 0;padding:0 25px 80px}.metrics{position:relative;display:grid;grid-template-columns:repeat(4,1fr);border-radius:24px;background:#fff9e9;box-shadow:0 14px 35px #183c3b22}.metrics article{padding:25px;text-align:center;border-right:1px solid #dfdccd}.metrics article:last-child{border:0}.metrics b{display:block;color:#e36843;font:25px 'ZCOOL KuaiLe'}.metrics span{font-size:11px;color:#73817b}.columns{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:28px}.columns article{padding:30px;border-radius:24px;background:#e0e8d8}.columns article+article{background:#ffe5a2}.columns h2{margin:6px 0 18px;font:32px 'ZCOOL KuaiLe'}.columns ul{padding-left:20px;line-height:2.2}.not-found{display:grid;min-height:100vh;place-content:center;gap:18px;background:#173e3e;color:#fff7d8;font-family:'ZCOOL KuaiLe';text-align:center}@media(max-width:650px){.hero{min-height:500px}.metrics{grid-template-columns:repeat(2,1fr)}.metrics article:nth-child(2){border-right:0}.columns{grid-template-columns:1fr}.content{padding:0 17px 50px}}
</style>
