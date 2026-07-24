<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const imageBase = `${import.meta.env.BASE_URL}images/`;
const selectedTrailImage = ref(localStorage.getItem('ggbond-trail-image') || `${imageBase}login/classic-character.jpg`);
const trail = ref<Array<{ x: number; y: number; id: number }>>([]);
let lastPoint = 0;

const series = [
  { season: '童话开篇', title: '猪猪侠', text: '从魔法、童话与冒险开始的热血旅程。', link: 'https://search.bilibili.com/all?keyword=%E7%8C%AA%E7%8C%AA%E4%BE%A0%20%E7%AC%AC%E4%B8%80%E5%AD%A3', color: '#ee653c' },
  { season: '竞速宇宙', title: '竞速小英雄', text: '驾驶炫酷赛车，在赛道上守护伙伴与勇气。', link: 'https://www.bilibili.com/video/BV1xpe6zbEDZ/', color: '#f2b62f' },
  { season: '决竞球篇', title: '竞球小英雄', text: '一颗球、一支队伍，向着热爱全力冲刺。', link: 'https://www.bilibili.com/bangumi/play/ss46473', color: '#5aaed7' },
  { season: '深海探索', title: '深海小英雄', text: '潜入蓝月星，展开一场海洋文明大冒险。', link: 'https://www.bilibili.com/bangumi/play/ep1201031', color: '#7963cc' },
];

const createTrail = (event: PointerEvent) => {
  if (event.pointerType === 'touch' || Date.now() - lastPoint < 65) return;
  lastPoint = Date.now();
  const id = Date.now();
  trail.value = [...trail.value.slice(-8), { x: event.clientX, y: event.clientY, id }];
  window.setTimeout(() => { trail.value = trail.value.filter((item) => item.id !== id); }, 760);
};

onBeforeUnmount(() => { trail.value = []; });
</script>

<template>
  <main class="home-page" @pointermove="createTrail">
    <div class="cursor-trail" aria-hidden="true">
      <img v-for="(item, index) in trail" :key="item.id" :src="selectedTrailImage" :style="{ left: `${item.x}px`, top: `${item.y}px`, '--delay': `${index * .04}s` }" />
    </div>

    <nav class="topbar">
      <a class="logo" href="#top"><span>G</span><b>猪猪侠</b><i>GG BOND</i></a>
      <div class="nav-links"><a href="#about">认识猪猪侠</a><a href="#series">动画宇宙</a><a href="#moments">精彩瞬间</a></div>
      <button type="button" class="back" @click="router.push('/login')">返回登陆 <span>↗</span></button>
    </nav>

    <section id="top" class="hero">
      <div class="hero-copy">
        <p class="eyebrow">WELCOME TO THE WONDER WORLD</p>
        <h1>我是猪猪侠！<em>热血和勇气，</em>从不缺席。</h1>
        <p class="lead">从童话世界到浩瀚宇宙，猪猪侠总会和伙伴们一起，用一点点机智、一大把勇气，守护每一份美好。</p>
        <div class="hero-actions"><a href="#series" class="primary">探索动画宇宙 <span>→</span></a><a href="#about" class="round-play" aria-label="了解角色">▶</a><span>向下滑动，开始冒险</span></div>
      </div>
      <div class="hero-visual">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><span class="spark s-one">✦</span><span class="spark s-two">✦</span>
        <div class="portrait"><img :src="`${imageBase}home/rainy-adventure.jpg`" alt="雨中猪猪侠" /><div class="portrait-label"><b>勇气值</b><strong>∞</strong></div></div>
        <div class="sticker sticker-one">我就是我<br /><b>不一样的烟火</b></div><div class="sticker sticker-two">GO!</div>
      </div>
      <div class="wave wave-back"></div><div class="wave wave-front"></div>
    </section>

    <section id="about" class="about section-wrap">
      <div class="section-heading"><p>CHARACTER FILE</p><h2>小小英雄，大大能量</h2></div>
      <div class="about-grid">
        <article class="quote-card"><span>“</span><p>遇到困难也别怕，换个角度想一想，总有办法！</p><small>— 猪猪侠的冒险守则</small></article>
        <article class="fact-card"><i>01</i><h3>乐观开朗</h3><p>把每一次意外，都变成有趣的新挑战。</p></article>
        <article class="fact-card"><i>02</i><h3>重情重义</h3><p>最珍惜的，是一路并肩作战的伙伴。</p></article>
        <article class="fact-card"><i>03</i><h3>永不服输</h3><p>跌倒没关系，拍拍灰尘继续向前冲。</p></article>
      </div>
    </section>

    <section id="series" class="series section-wrap">
      <div class="section-heading"><p>ANIMATION UNIVERSE</p><h2>打开动画宇宙</h2><span>点击卡片前往对应的正版播放或检索页面</span></div>
      <div class="series-grid">
        <a v-for="(item, index) in series" :key="item.title" class="series-card" :href="item.link" target="_blank" rel="noreferrer" :style="{ '--accent': item.color, '--n': index }">
          <div class="card-number">0{{ index + 1 }}</div><div class="mini-character">●</div><p>{{ item.season }}</p><h3>{{ item.title }}</h3><span>{{ item.text }}</span><b>去看看 ↗</b>
        </a>
      </div>
    </section>

    <section id="moments" class="moments section-wrap">
      <div><p class="eyebrow">HERO MOMENTS</p><h2>冒险从不只有一种模样</h2><p>雨天戴着帽子也要保持帅气，赛场上全力冲刺，面对朋友时又总是最温柔。</p></div>
      <div class="moment-images"><img :src="`${imageBase}login/close-up.jpg`" alt="猪猪侠特写" /><img :src="`${imageBase}login/portrait-character.jpg`" alt="猪猪侠头像" /><img :src="`${imageBase}login/rainy-hero.jpg`" alt="猪猪侠雨中冒险" /></div>
    </section>

    <footer>GG BOND · 快乐冒险永不落幕 <span>鼠标移动试试惊喜拖尾</span></footer>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');
*{box-sizing:border-box}.home-page{overflow:hidden;background:#fff8e5;color:#572e28;font-family:'Noto Sans SC',sans-serif}.topbar{position:absolute;z-index:10;display:flex;align-items:center;justify-content:space-between;width:100%;padding:24px clamp(24px,6vw,88px);color:#fff9de}.logo{display:flex;align-items:center;gap:8px;color:inherit;text-decoration:none}.logo span{display:grid;place-items:center;width:36px;height:36px;border:3px solid #ffe688;border-radius:13px;background:#e95737;font:25px 'ZCOOL KuaiLe';transform:rotate(-8deg)}.logo b{font:22px 'ZCOOL KuaiLe'}.logo i{font-size:9px;font-style:normal;letter-spacing:1.4px;opacity:.8}.nav-links{display:flex;gap:28px}.nav-links a{color:inherit;font-size:13px;text-decoration:none}.back{border:1px solid #fff4c2;border-radius:99px;padding:9px 15px;background:rgba(255,255,255,.12);color:#fff;font:13px 'Noto Sans SC';cursor:pointer}.back span{margin-left:5px}.hero{position:relative;display:flex;align-items:center;min-height:740px;padding:130px clamp(24px,9vw,150px) 125px;background:radial-gradient(circle at 75% 35%,#ffb84e 0 8%,transparent 31%),linear-gradient(133deg,#64324c 0%,#a6444e 42%,#ed7540 100%);color:#fff8df}.hero-copy{position:relative;z-index:2;width:min(580px,53%)}.eyebrow,.section-heading>p{margin:0 0 11px;color:#f5cf75;font-size:11px;font-weight:900;letter-spacing:2px}.hero h1{margin:0;font:clamp(42px,5.2vw,76px)/1.12 'ZCOOL KuaiLe';letter-spacing:1px}.hero h1 em{display:block;color:#ffd85a;font-style:normal}.lead{max-width:465px;margin:24px 0 28px;color:#fff5d3;line-height:1.9;font-size:14px}.hero-actions{display:flex;align-items:center;gap:13px;font-size:12px}.primary{padding:14px 20px;border-radius:15px;background:#ffd549;color:#722f2a;font-weight:900;text-decoration:none;box-shadow:0 5px 0 #c7812b}.primary span{margin-left:10px;font-size:19px}.round-play{display:grid;place-items:center;width:47px;height:47px;border:2px solid #fff5c8;border-radius:50%;color:#fff;text-decoration:none}.hero-actions>span{opacity:.76}.hero-visual{position:absolute;right:9%;top:130px;width:min(420px,39vw);height:465px}.portrait{position:absolute;z-index:3;inset:32px 28px 20px;overflow:hidden;border:7px solid #ffe8a5;border-radius:48% 48% 42% 42%;background:#d64f38;box-shadow:0 20px 45px #572c3c99;transform:rotate(4deg)}.portrait img{width:100%;height:100%;object-fit:cover}.portrait-label{position:absolute;right:0;bottom:35px;padding:8px 13px;border-radius:14px 0 0 14px;background:#ffe453;color:#763932}.portrait-label b{display:block;font-size:10px}.portrait-label strong{font:30px 'ZCOOL KuaiLe'}.orbit{position:absolute;border:1px solid #ffd86799;border-radius:50%;animation:spin 14s linear infinite}.orbit-one{inset:0;transform:rotate(-24deg)}.orbit-two{inset:55px -25px -12px 50px;animation-direction:reverse}.spark{position:absolute;z-index:4;color:#ffe956;font-size:28px;animation:twinkle 1.6s ease-in-out infinite alternate}.s-one{top:35px;right:10px}.s-two{left:0;bottom:55px;font-size:18px}.sticker{position:absolute;z-index:5;border:3px solid #fff0af;background:#efc83e;color:#7a392a;font:18px/1.2 'ZCOOL KuaiLe';box-shadow:0 6px 0 #a94737}.sticker-one{right:-28px;top:58px;padding:12px;border-radius:16px 22px 15px 23px;transform:rotate(10deg)}.sticker-one b{font-size:11px}.sticker-two{left:-12px;bottom:48px;display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:#e85739;color:#fff5be;transform:rotate(-15deg)}.wave{position:absolute;right:-10%;bottom:-2px;left:-10%;height:125px;border-radius:50% 50% 0 0}.wave-back{background:#f6b43f;transform:translateY(27px) rotate(-3deg)}.wave-front{background:#f9d458;transform:translateY(62px) rotate(3deg)}.section-wrap{padding:95px clamp(24px,9vw,150px)}.section-heading h2,.moments h2{margin:0;color:#64332a;font:clamp(32px,4vw,52px) 'ZCOOL KuaiLe'}.section-heading>span{display:block;margin-top:10px;color:#987462;font-size:13px}.about{background:#f9d458}.about-grid{display:grid;grid-template-columns:1.45fr repeat(3,1fr);gap:16px;margin-top:34px}.quote-card,.fact-card{min-height:205px;padding:25px;border-radius:25px;background:#fff5d3;box-shadow:0 9px 0 #dfa74033}.quote-card{background:#e85d3d;color:#fff7d7}.quote-card>span{font:65px Georgia;line-height:.5}.quote-card p{margin:14px 0;font:25px/1.45 'ZCOOL KuaiLe'}.quote-card small{opacity:.8}.fact-card i{font:16px 'ZCOOL KuaiLe';color:#e55b3e}.fact-card h3{margin:25px 0 8px;font:22px 'ZCOOL KuaiLe'}.fact-card p{color:#96765b;font-size:13px;line-height:1.8}.series{background:#fff8e5}.series-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:35px}.series-card{position:relative;min-height:285px;overflow:hidden;padding:24px;border-radius:25px;background:var(--accent);color:#fffbed;text-decoration:none;box-shadow:0 10px 0 color-mix(in srgb,var(--accent),#633038 30%);transition:transform .25s}.series-card:hover{transform:translateY(-10px) rotate(-1deg)}.card-number{font:40px 'ZCOOL KuaiLe';opacity:.48}.mini-character{position:absolute;right:20px;top:25px;display:grid;place-items:center;width:54px;height:54px;border:4px solid #fff8dd;border-radius:50%;background:#e9553d;color:#ffd54b;font-size:30px}.series-card p{margin:45px 0 5px;font-size:11px;font-weight:900;letter-spacing:1px}.series-card h3{margin:0;font:28px 'ZCOOL KuaiLe'}.series-card>span{display:block;margin-top:12px;font-size:12px;line-height:1.75}.series-card>b{position:absolute;bottom:22px;font-size:13px}.moments{display:grid;grid-template-columns:.85fr 1.15fr;gap:55px;align-items:center;background:#59334d;color:#fff}.moments h2{color:#ffe458}.moments>div>p:last-child{max-width:380px;color:#f6e5d1;line-height:1.9;font-size:14px}.moment-images{display:grid;grid-template-columns:1fr 1.05fr 1fr;align-items:center}.moment-images img{width:100%;height:220px;object-fit:cover;border:6px solid #f9e2a4;border-radius:28px;transform:rotate(-6deg);box-shadow:0 14px 22px #2d1a2c77}.moment-images img:nth-child(2){height:285px;transform:translateY(-18px) rotate(3deg);z-index:1}.moment-images img:nth-child(3){transform:rotate(7deg)}footer{display:flex;justify-content:space-between;padding:25px clamp(24px,9vw,150px);background:#3e9d5a;color:#f8f0c9;font:17px 'ZCOOL KuaiLe'}footer span{font:12px 'Noto Sans SC';opacity:.8}.cursor-trail{position:fixed;z-index:100;pointer-events:none}.cursor-trail img{position:fixed;width:36px;height:36px;border:2px solid #fff2a7;border-radius:50%;object-fit:cover;transform:translate(-50%,-50%);animation:trail .76s ease-out forwards;box-shadow:0 4px 10px #67303a88}@keyframes trail{to{opacity:0;transform:translate(-50%,-85%) scale(.25) rotate(30deg)}}@keyframes spin{to{transform:rotate(336deg)}}@keyframes twinkle{to{transform:scale(1.35) rotate(20deg);opacity:.5}}@media(max-width:850px){.topbar{padding:20px}.nav-links{display:none}.hero{min-height:880px;padding:125px 25px 90px;align-items:flex-start}.hero-copy{width:100%}.hero h1{font-size:47px}.hero-visual{top:auto;right:50%;bottom:70px;width:310px;height:350px;transform:translateX(50%)}.portrait{inset:25px 20px 15px}.about-grid,.series-grid{grid-template-columns:repeat(2,1fr)}.quote-card{grid-column:span 2}.moments{grid-template-columns:1fr;gap:40px}.section-wrap{padding:70px 25px}.moment-images img{height:150px}.moment-images img:nth-child(2){height:190px}footer{padding:22px 25px;font-size:14px}}@media(max-width:480px){.logo i,.hero-actions>span,footer span{display:none}.hero h1{font-size:39px}.about-grid,.series-grid{grid-template-columns:1fr}.quote-card{grid-column:auto}.series-card{min-height:220px}.moment-images img{height:110px}.moment-images img:nth-child(2){height:145px}}
</style>
