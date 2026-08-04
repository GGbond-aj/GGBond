<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getHikingRoute } from '../../data/hikingRoutes';

const route = useRoute();
const router = useRouter();
const trail = computed(() => getHikingRoute(String(route.params.slug)));
const scenicVideos: Record<string, string> = {
  'tiger-leaping-gorge': 'https://player.bilibili.com/player.html?bvid=BV1RAF5z2Ed8&autoplay=1&muted=1&loop=1',
  yubeng: 'https://player.bilibili.com/player.html?bvid=BV17J4m1A7dE&autoplay=1&muted=1&loop=1',
  'wugong-mountain': 'https://player.bilibili.com/player.html?bvid=BV1yV4y1Y7es&autoplay=1&muted=1&loop=1',
  'wuyi-mountain': 'https://player.bilibili.com/player.html?bvid=BV17t411S7UP&autoplay=1&muted=1&loop=1',
  kanas: 'https://player.bilibili.com/player.html?bvid=BV1ZE411E7iT&autoplay=1&muted=1&loop=1',
  'emei-mountain': 'https://player.bilibili.com/player.html?bvid=BV19v4y1N7aD&autoplay=1&muted=1&loop=1',
  shennongjia: 'https://player.bilibili.com/player.html?bvid=BV1CK4y1v736&autoplay=1&muted=1&loop=1',
  qinling: 'https://player.bilibili.com/player.html?bvid=BV1R7411M7HE&autoplay=1&muted=1&loop=1',
  siguniang: 'https://player.bilibili.com/player.html?bvid=BV1LV4y1976b&autoplay=1&muted=1&loop=1',
  'great-wall': 'https://player.bilibili.com/player.html?bvid=BV1kr4y1h7jA&autoplay=1&muted=1&loop=1',
};
const scenicVideo = computed(() => trail.value ? scenicVideos[trail.value.slug] : '');
</script>

<template>
  <main v-if="trail" class="detail-page">
    <section class="hero">
      <iframe class="hero-video" :src="scenicVideo" title="路线景色视频" allow="autoplay; fullscreen" allowfullscreen></iframe>
      <div class="hero-overlay"></div>
      <button @click="router.push('/world')">← 全部路线</button>
      <div class="hero-copy"><p>{{ trail.region }}</p><h1>{{ trail.name }}</h1><span>{{ trail.summary }}</span></div>
    </section>
    <section class="content"><div class="metrics"><article><b>{{ trail.distance }}</b><span>推荐距离</span></article><article><b>{{ trail.duration }}</b><span>建议天数</span></article><article><b>{{ trail.difficulty }}</b><span>难度等级</span></article><article><b>{{ trail.season }}</b><span>适合季节</span></article></div><div class="columns"><article><p class="label">ROUTE HIGHLIGHTS</p><h2>沿途风景</h2><ul><li v-for="item in trail.highlights" :key="item">{{ item }}</li></ul></article><article><p class="label">BEFORE YOU GO</p><h2>出发前提醒</h2><ul><li v-for="item in trail.tips" :key="item">{{ item }}</li></ul></article></div><div class="guide-grid"><article><p class="label">PACE YOUR DAY</p><h2>建议行程节奏</h2><ol><li><b>第一段</b><span>清晨出发，以热身和熟悉步道为主，保留充足体力。</span></li><li><b>核心段</b><span>午前完成主要爬升或观景路段，在开阔处及时补水与补给。</span></li><li><b>收尾段</b><span>预留天气与拍摄时间，天黑前抵达安全的休息或住宿点。</span></li></ol></article><article><p class="label">GEAR CHECKLIST</p><h2>轻量装备清单</h2><div class="gear"><span>防滑徒步鞋</span><span>分层保暖衣物</span><span>雨具与防晒</span><span>离线地图</span><span>水与能量补给</span><span>基础急救包</span></div><p class="weather">天气会改变路线难度。出发前请查看官方公告和实时天气，并根据自身经验决定是否继续前行。</p></article></div></section>
  </main>
  <main v-else class="not-found"><h1>这条路线还在云雾中</h1><button @click="router.push('/world')">返回路线列表</button></main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;600;800&display=swap');
.detail-page{min-height:100vh;background:#f6f0dd;color:#1e423d;font-family:'Noto Sans SC',sans-serif}.hero{position:relative;min-height:570px;padding:34px clamp(24px,9vw,145px);background:#102b2b;color:#fff9dc;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.hero-video{position:absolute;z-index:0;inset:0;width:100%;height:100%;border:0;pointer-events:none}.hero-overlay{position:absolute;z-index:1;inset:0;background:linear-gradient(90deg,#102b2bd9 0%,#102b2b66 60%,#102b2b22)}.hero button,.hero-copy{position:relative;z-index:2}.hero button,.not-found button{align-self:flex-start;border:1px solid #fff1b5;border-radius:99px;padding:10px 16px;background:#173e3ebd;color:#fff8d8;cursor:pointer}.hero-copy{max-width:690px;margin-bottom:60px}.hero p,.label{color:#f5cb5a;letter-spacing:2px;font-weight:800;font-size:11px}.hero h1{margin:8px 0 16px;font:clamp(48px,7vw,88px) 'ZCOOL KuaiLe'}.hero span{line-height:1.9}.content{max-width:1100px;margin:-45px auto 0;padding:0 25px 80px}.metrics{position:relative;display:grid;grid-template-columns:repeat(4,1fr);border-radius:24px;background:#fff9e9;box-shadow:0 14px 35px #183c3b22}.metrics article{padding:25px;text-align:center;border-right:1px solid #dfdccd}.metrics article:last-child{border:0}.metrics b{display:block;color:#e36843;font:25px 'ZCOOL KuaiLe'}.metrics span{font-size:11px;color:#73817b}.columns{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:28px}.columns article{padding:30px;border-radius:24px;background:#e0e8d8}.columns article+article{background:#ffe5a2}.columns h2{margin:6px 0 18px;font:32px 'ZCOOL KuaiLe'}.columns ul{padding-left:20px;line-height:2.2}.not-found{display:grid;min-height:100vh;place-content:center;gap:18px;background:#173e3e;color:#fff7d8;font-family:'ZCOOL KuaiLe';text-align:center}@media(max-width:650px){.hero{min-height:500px}.metrics{grid-template-columns:repeat(2,1fr)}.metrics article:nth-child(2){border-right:0}.columns{grid-template-columns:1fr}.content{padding:0 17px 50px}}
.guide-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}.guide-grid article{padding:30px;border-radius:24px;background:#d9e4d0}.guide-grid article+article{background:#fff4d0}.guide-grid h2{margin:6px 0 18px;font:32px 'ZCOOL KuaiLe'}.guide-grid ol{display:grid;gap:12px;margin:0;padding:0;list-style:none}.guide-grid li{display:grid;grid-template-columns:78px 1fr;gap:8px;line-height:1.65;font-size:13px}.guide-grid li b{color:#db623f;font-family:'ZCOOL KuaiLe'}.gear{display:flex;flex-wrap:wrap;gap:9px}.gear span{padding:7px 10px;border:1px solid #c4b46a;border-radius:99px;background:#fff9e6;font-size:12px}.weather{margin:20px 0 0;color:#5b6962;font-size:13px;line-height:1.8}@media(max-width:650px){.guide-grid{grid-template-columns:1fr}}
@media(min-width:901px){.detail-page{height:100dvh;min-height:0;overflow:hidden;display:flex;flex-direction:column}.hero{height:39dvh;min-height:310px;padding-block:24px;flex:0 0 auto}.hero-copy{margin-bottom:20px}.content{box-sizing:border-box;flex:1;width:min(1100px,100%);margin:0 auto;padding:14px 25px 22px}.metrics article{padding:13px}.metrics b{font-size:22px}.columns{margin-top:14px;gap:14px}.columns article,.guide-grid article{padding:18px}.columns h2,.guide-grid h2{margin:4px 0 8px;font-size:25px}.columns ul{margin:0;padding-left:18px;line-height:1.7;font-size:13px}.guide-grid{margin-top:14px;gap:14px}.guide-grid ol{gap:6px}.guide-grid li{line-height:1.4;font-size:11px}.weather{margin-top:10px;font-size:11px;line-height:1.5}.gear{gap:6px}.gear span{padding:4px 7px;font-size:10px}}
</style>
