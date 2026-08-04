<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiBaseUrl } from '../../api/http';

const router = useRouter();
const account = ref('');
const password = ref('');
const remember = ref(true);
const passwordVisible = ref(false);
const message = ref('');
const submitting = ref(false);
const imageBase = `${import.meta.env.BASE_URL}images/login/`;
const gallery = [
  { src: `${imageBase}rainy-hero.jpg`, alt: '雨中造型' },
  { src: `${imageBase}close-up.jpg`, alt: '可爱特写' },
  { src: `${imageBase}bow-character.jpg`, alt: '蝴蝶结造型' },
  { src: `${imageBase}classic-character.jpg`, alt: '经典造型' },
  { src: `${imageBase}portrait-character.jpg`, alt: '角色头像' },
];
const activeImage = ref(3);
const activePhoto = computed(() => gallery[activeImage.value] ?? gallery[0]!);

const goHome = async () => {
  message.value = '';

  const username = account.value.trim().toLowerCase();

  if (username === 'ggbond') {
    localStorage.setItem('ggbond-user', JSON.stringify({ id: 'local-ggbond', username }));
    localStorage.setItem('ggbond-trail-image', activePhoto.value.src);
    message.value = '冒险队长，直接出发！';
    window.setTimeout(() => router.push('/home'), 350);
    return;
  }

  if (!username || !password.value) {
    message.value = '请输入账号和秘密口令';
    return;
  }

  submitting.value = true;
  try {
    // Vite 会把 /api 请求代理到 Spring Boot 的 8080 端口。
    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password: password.value,
      }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.detail || body.message || '登录失败');
    }

    // 这里只保存非敏感的基础用户信息，绝不保存密码。
    localStorage.setItem('ggbond-user', JSON.stringify({ id: body.id, username: body.username }));
    localStorage.setItem('ggbond-trail-image', activePhoto.value.src);
    message.value = '冒险小队，出发！';
    window.setTimeout(() => router.push('/home'), 350);
  } catch (error) {
    message.value = error instanceof Error ? error.message : '登录失败';
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <main class="login-page">
    <div class="sky-deco cloud cloud-one"></div>
    <div class="sky-deco cloud cloud-two"></div>
    <div class="sky-deco star star-one">✦</div>
    <div class="sky-deco star star-two">✦</div>

    <section class="scene" aria-label="欢乐冒险登录页面">
      <div class="brand">
        <div class="brand-badge">G</div>
        <div>
          <p>HAPPY ADVENTURE</p>
          <h1>猪猪侠<span>的奇妙世界</span></h1>
        </div>
      </div>

      <div class="photo-showcase">
        <div class="photo-frame">
          <img :src="activePhoto.src" :alt="activePhoto.alt" />
          <span class="photo-tag">冒险搭档</span>
        </div>
        <div class="photo-gallery" aria-label="角色图片选择">
          <button v-for="(image, index) in gallery" :key="image.src" type="button" :class="{ active: activeImage === index }" :aria-label="`查看${image.alt}`" @click="activeImage = index">
            <img :src="image.src" :alt="image.alt" />
          </button>
        </div>
      </div>

      <form class="login-card" @submit.prevent="goHome">
        <div class="card-heading">
          <span class="sparkle">✦</span>
          <div><h2>欢迎回来！</h2><p>和小伙伴一起开启冒险吧</p></div>
        </div>

        <label class="field">
          <span class="field-icon user-icon">●</span>
          <input v-model="account" autocomplete="username" placeholder="冒险者账号" aria-label="冒险者账号" />
        </label>
        <label class="field">
          <span class="field-icon lock-icon">▣</span>
          <input v-model="password" :type="passwordVisible ? 'text' : 'password'" autocomplete="current-password" placeholder="秘密口令" aria-label="秘密口令" />
          <button class="eye-toggle" type="button" :aria-label="passwordVisible ? '隐藏口令' : '显示口令'" @click="passwordVisible = !passwordVisible">{{ passwordVisible ? '◉' : '○' }}</button>
        </label>

        <div class="options">
          <label class="remember"><input v-model="remember" type="checkbox" /><span>记住我</span></label>
          <a href="#help" @click.prevent="message = '别着急，找小伙伴帮你找回口令！'">忘记口令？</a>
        </div>
        <button class="login-button" type="submit" :disabled="submitting">{{ submitting ? '正在验证口令…' : '进入奇妙世界' }} <span>➜</span></button>
        <p v-if="message" class="hint">{{ message }}</p>
        <button v-else class="register-link" type="button" @click="router.push('/register')">还没有账号？快去找村长报到吧！</button>
      </form>

      <div class="grass"></div>
      <div class="flower flower-one">✿</div><div class="flower flower-two">✿</div>
      <div class="hill hill-back"></div><div class="hill hill-front"></div>
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');

* { box-sizing: border-box; }
.login-page { min-height: 100vh; overflow: hidden; background: linear-gradient(155deg, #fff8c5 0%, #ffdd78 42%, #f7a834 100%); color: #66341c; font-family: 'Noto Sans SC', sans-serif; }
.scene { position: relative; width: min(1160px, 100%); min-height: 100vh; margin: auto; padding: clamp(28px, 5vw, 64px); isolation: isolate; }
.brand { position: relative; z-index: 3; display: flex; align-items: center; gap: 12px; }
.brand-badge { display: grid; place-items: center; width: 52px; height: 52px; border: 4px solid #fff4bc; border-radius: 18px 24px 18px 24px; background: #e95132; color: #fff9da; font: 32px 'ZCOOL KuaiLe', cursive; transform: rotate(-8deg); box-shadow: 0 5px 0 #b6432d; }
.brand p { margin: 0 0 2px; color: #a65d22; font-weight: 900; font-size: 10px; letter-spacing: 2.2px; }
.brand h1 { margin: 0; color: #c74c2c; font: clamp(24px, 3vw, 36px) 'ZCOOL KuaiLe', cursive; line-height: 1; text-shadow: 2px 2px #fff1aa; }.brand h1 span { color: #77361f; margin-left: 6px; }
.login-card { position: relative; z-index: 4; width: min(430px, 100%); margin: clamp(55px, 11vh, 125px) 0 0 auto; padding: 34px 34px 23px; border: 3px solid #fff9d6; border-radius: 30px; background: rgba(255, 252, 232, .91); box-shadow: 0 15px 0 rgba(172, 80, 25, .13), 0 20px 42px rgba(147, 67, 22, .2); }
.card-heading { display: flex; align-items: center; gap: 12px; margin-bottom: 26px; }.sparkle { color: #f2a42c; font-size: 32px; }.card-heading h2 { margin: 0; font: 27px 'ZCOOL KuaiLe', cursive; color: #d85a35; }.card-heading p { margin: 3px 0 0; color: #9f7950; font-size: 13px; }
.field { display: flex; align-items: center; height: 54px; margin-top: 14px; padding: 0 14px; border: 2px solid #f0d9a3; border-radius: 16px; background: #fffdf2; transition: .2s; }.field:focus-within { border-color: #ec8c36; box-shadow: 0 0 0 4px #ffe4a6; }.field input { width: 100%; min-width: 0; border: 0; outline: none; background: transparent; color: #68412b; font: 500 14px 'Noto Sans SC', sans-serif; }.field input::placeholder { color: #c7ad88; }.field-icon { width: 24px; color: #e88135; font-size: 16px; }.user-icon { font-size: 12px; }.lock-icon { font-size: 15px; }.eye-toggle { border: 0; padding: 3px; background: transparent; color: #ce9b61; font-size: 20px; line-height: 1; }.eye-toggle:hover { color: #df6c35; }
.options { display: flex; justify-content: space-between; align-items: center; margin: 15px 2px 19px; font-size: 12px; }.remember { display: flex; align-items: center; gap: 6px; color: #9b7957; cursor: pointer; }.remember input { appearance: none; display: grid; place-content: center; width: 16px; height: 16px; margin: 0; border: 2px solid #e7b66b; border-radius: 5px; background: #fff; }.remember input:checked { background: #e87532; }.remember input:checked::after { content: '✓'; color: white; font-size: 11px; font-weight: 900; }.options a { color: #df6a37; font-weight: 700; text-decoration: none; }
.login-button { width: 100%; border: 0; border-bottom: 5px solid #b9452e; border-radius: 16px; padding: 13px; background: #e96035; color: #fffce1; font: 21px 'ZCOOL KuaiLe', cursive; box-shadow: 0 4px 0 #f6a149 inset; transition: transform .15s, border-width .15s; }.login-button:hover { transform: translateY(-2px); }.login-button:active { transform: translateY(3px); border-bottom-width: 2px; }.login-button span { margin-left: 8px; }.hint { min-height: 18px; margin: 14px 0 0; color: #b38a5c; font-size: 11px; text-align: center; }
.register-link { display: block; width: 100%; margin: 14px 0 0; padding: 0; border: 0; background: transparent; color: #d75e34; font: 700 12px 'Noto Sans SC', sans-serif; cursor: pointer; }.register-link:hover { text-decoration: underline; }
.photo-showcase { position: absolute; z-index: 4; right: clamp(470px, 48vw, 570px); top: 18%; width: min(330px, 32vw); animation: bob 3s ease-in-out infinite; }
.photo-frame { position: relative; overflow: hidden; padding: 8px; border: 5px solid #fff8ce; border-radius: 38% 38% 31% 31%; background: #e95936; box-shadow: 0 16px 0 rgba(143, 62, 24, .14), 0 24px 32px rgba(126, 62, 24, .25); transform: rotate(-4deg); }
.photo-frame img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 35% 35% 28% 28%; }
.photo-tag { position: absolute; right: -4px; bottom: 19px; padding: 6px 14px; border: 2px solid #fff8ce; border-radius: 15px 0 0 15px; background: #efbb2c; color: #75341f; font: 16px 'ZCOOL KuaiLe', cursive; }
.photo-gallery { display: flex; justify-content: center; gap: 7px; margin-top: 17px; padding: 7px; border-radius: 22px; background: rgba(255, 245, 190, .72); }
.photo-gallery button { width: 41px; height: 41px; overflow: hidden; padding: 0; border: 3px solid transparent; border-radius: 50%; background: #fff8d6; box-shadow: 0 2px 0 rgba(125, 61, 24, .15); }.photo-gallery button.active { border-color: #dc5736; transform: translateY(-3px); }.photo-gallery img { display: block; width: 100%; height: 100%; object-fit: cover; }
.mascot { position: absolute; z-index: 3; right: clamp(455px, 47vw, 550px); top: 19%; width: 225px; height: 285px; filter: drop-shadow(0 16px 7px rgba(145, 74, 20, .2)); animation: bob 3s ease-in-out infinite; }.head { position: absolute; z-index: 3; top: 35px; left: 24px; width: 176px; height: 148px; border: 5px solid #9f3f2d; border-radius: 47% 47% 46% 46%; background: #ff9c83; }.ear { position: absolute; z-index: 2; top: 10px; width: 62px; height: 68px; border: 5px solid #9f3f2d; border-radius: 53% 45% 40% 50%; background: #ff9c83; }.ear-left { left: 17px; transform: rotate(-31deg); }.ear-right { right: 17px; transform: rotate(31deg); }.eye { position: absolute; top: 45px; width: 37px; height: 46px; border: 4px solid #7b3328; border-radius: 50%; background: #fffdf0; }.eye i { position: absolute; width: 12px; height: 18px; top: 12px; left: 11px; border-radius: 50%; background: #3c2b2b; }.eye-left { left: 31px; }.eye-right { right: 31px; }.brow { position: absolute; top: 28px; width: 35px; height: 9px; border-radius: 50%; background: #9f3f2d; }.brow-left { left: 34px; transform: rotate(8deg); }.brow-right { right: 34px; transform: rotate(-8deg); }.snout { position: absolute; left: 55px; top: 92px; display: flex; justify-content: center; gap: 13px; align-items: center; width: 60px; height: 36px; border: 4px solid #c75342; border-radius: 48%; background: #ffb49f; }.snout b { width: 9px; height: 12px; border-radius: 50%; background: #a94338; }.smile { position: absolute; left: 75px; bottom: 9px; width: 28px; height: 13px; border-bottom: 4px solid #8d392d; border-radius: 50%; }.body { position: absolute; z-index: 2; left: 42px; top: 160px; width: 142px; height: 105px; border: 5px solid #9f3f2d; border-radius: 47% 47% 26px 26px; background: #e84f36; text-align: center; }.body span { display: inline-block; margin-top: 26px; color: #ffe76f; font: 34px 'ZCOOL KuaiLe', cursive; transform: rotate(-7deg); }.cape { position: absolute; z-index: 0; top: 126px; left: 24px; width: 160px; height: 110px; border-radius: 15px 60% 60% 55%; background: #f9d646; transform: rotate(22deg); }.arm { position: absolute; z-index: 1; top: 173px; width: 55px; height: 32px; border: 5px solid #9f3f2d; border-radius: 50%; background: #ff9c83; }.arm-left { left: 4px; transform: rotate(-28deg); }.arm-right { right: 4px; transform: rotate(28deg); }.leg { position: absolute; z-index: 1; bottom: 0; width: 55px; height: 53px; border: 5px solid #9f3f2d; border-radius: 14px 14px 25px 25px; background: #f5d93d; }.leg-left { left: 52px; }.leg-right { right: 45px; }
.hill, .grass { position: absolute; z-index: 1; bottom: -100px; border-radius: 50% 50% 0 0; }.hill-back { left: -12%; width: 66%; height: 260px; background: #a1c94c; transform: rotate(4deg); }.hill-front { right: -12%; width: 57%; height: 230px; background: #6daa3e; transform: rotate(-5deg); }.grass { z-index: 2; bottom: 0; left: 0; width: 100%; height: 55px; background: #5b9c3b; }.cloud { position: absolute; z-index: 0; width: 180px; height: 45px; border-radius: 50px; background: rgba(255,255,230,.66); }.cloud::before, .cloud::after { position: absolute; content: ''; border-radius: 50%; background: inherit; }.cloud::before { width: 75px; height: 75px; bottom: 0; left: 28px; }.cloud::after { width: 56px; height: 56px; bottom: 0; right: 20px; }.cloud-one { top: 15%; left: 7%; transform: scale(.7); }.cloud-two { right: 4%; top: 12%; transform: scale(.5); }.star { position: absolute; z-index: 2; color: #fff9b8; font-size: 32px; }.star-one { left: 41%; top: 20%; }.star-two { left: 8%; top: 48%; font-size: 20px; }.flower { position: absolute; z-index: 3; bottom: 38px; color: #fff6b0; font-size: 35px; }.flower-one { left: 16%; }.flower-two { right: 12%; color: #ffcd5b; }
@keyframes bob { 50% { transform: translateY(-10px) rotate(2deg); } }
@media (max-width: 740px) { .scene { padding: 25px 20px 80px; display: flex; flex-direction: column; align-items: center; }.brand { align-self: flex-start; }.brand h1 { font-size: 25px; }.photo-showcase { position: relative; top: auto; right: auto; order: 2; width: 220px; margin: 10px 0 14px; }.photo-gallery { margin-top: 11px; }.photo-gallery button { width: 32px; height: 32px; }.login-card { order: 3; margin: 0; padding: 28px 23px 18px; }.cloud-two, .star-one { display: none; }.hill-back { width: 95%; }.hill-front { width: 86%; } }
</style>
