<script setup lang="ts">
import { useRouter } from 'vue-router';
import { hikingRoutes } from '../../data/hikingRoutes';

const router = useRouter();
</script>

<template>
  <main class="world-page">
    <header><button @click="router.push('/home')">← 返回主页</button><p>EXPLORE CHINA</p><h1>探索世界 · 中国经典徒步路线</h1><span>十条路线，十种山河相遇的方式</span></header>
    <section class="route-grid">
      <article v-for="(route, index) in hikingRoutes" :key="route.slug" class="route-card" @click="router.push(`/world/${route.slug}`)">
        <img :src="route.image" :alt="route.name" /><div class="shade"></div><em>0{{ index + 1 }}</em><div class="card-copy"><p>{{ route.region }}</p><h2>{{ route.name }}</h2><span>{{ route.distance }} · {{ route.duration }}</span></div>
      </article>
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;600;800&display=swap');
.world-page{min-height:100vh;padding:42px clamp(22px,7vw,110px) 80px;background:#133a38;color:#fff8de;font-family:'Noto Sans SC',sans-serif}header{max-width:750px;margin-bottom:38px}header button{border:1px solid #97d4b2;border-radius:99px;padding:9px 14px;background:transparent;color:#daf5d8;cursor:pointer}header p{margin:33px 0 8px;color:#f2c556;letter-spacing:3px;font-size:11px;font-weight:800}h1{margin:0;font:clamp(36px,5vw,64px)/1.18 'ZCOOL KuaiLe',cursive}header span{display:block;margin-top:16px;color:#d1e7d2}.route-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:15px}.route-card{position:relative;min-height:260px;overflow:hidden;border:3px solid #f5db93;border-radius:23px;cursor:pointer;box-shadow:0 10px 0 #06282755;transition:.25s}.route-card:hover{transform:translateY(-8px) rotate(-1deg)}.route-card img{width:100%;height:100%;position:absolute;object-fit:cover}.shade{position:absolute;inset:0;background:linear-gradient(0deg,#0d292ddd,transparent 65%)}em{position:absolute;top:15px;left:16px;color:#ffe998;font:25px 'ZCOOL KuaiLe'}.card-copy{position:absolute;right:17px;bottom:17px;left:17px}.card-copy p{margin:0;color:#f7d45f;font-size:10px}.card-copy h2{margin:5px 0;font:25px 'ZCOOL KuaiLe'}.card-copy span{font-size:11px}@media(max-width:900px){.route-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:580px){.world-page{padding:28px 18px 50px}.route-grid{grid-template-columns:repeat(2,1fr)}.route-card{min-height:210px}.card-copy h2{font-size:20px}}
.world-page{box-sizing:border-box;height:100dvh;min-height:100dvh;overflow:hidden;padding:30px clamp(22px,4.3vw,88px) 42px}.world-page header{margin-bottom:22px}.world-page header p{margin:20px 0 6px}.world-page header span{margin-top:9px;font-size:12px}.world-page .route-grid{grid-template-rows:repeat(2,clamp(165px,21vh,205px));height:auto}.world-page .route-card{min-height:0}.world-page em{top:12px;left:14px;font-size:clamp(18px,1.6vw,25px)}.world-page .card-copy{right:14px;bottom:13px;left:14px}.world-page .card-copy h2{font-size:clamp(18px,1.7vw,25px)}@media(max-width:900px){.world-page{height:auto;min-height:100vh;overflow:auto}.world-page .route-grid{grid-template-rows:none}.world-page .route-card{min-height:220px}}
</style>
