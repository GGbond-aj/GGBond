<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiBaseUrl } from '../../api/http';

const router = useRouter();
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const submitting = ref(false);
const message = ref('');
const success = ref(false);

const register = async () => {
  message.value = '';
  success.value = false;

  if (!/^[A-Za-z0-9_]{3,32}$/.test(username.value.trim())) {
    message.value = '账号需为 3-32 位字母、数字或下划线';
    return;
  }
  if (password.value.length < 6 || password.value.length > 72) {
    message.value = '密码长度需为 6-72 位';
    return;
  }
  if (password.value !== confirmPassword.value) {
    message.value = '两次输入的密码不一致';
    return;
  }

  submitting.value = true;
  try {
    const response = await fetch(`${apiBaseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value,
      }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.detail || body.message || '注册失败，请稍后重试');
    }

    success.value = true;
    message.value = `账号 ${body.username} 注册成功，正在返回登录页…`;
    window.setTimeout(() => router.push('/login'), 1200);
  } catch (error) {
    message.value = error instanceof Error ? error.message : '注册失败，请稍后重试';
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <main class="register-page">
    <div class="cloud cloud-one"></div>
    <div class="cloud cloud-two"></div>
    <section class="register-card">
      <button class="back" type="button" @click="router.push('/login')">← 返回登录</button>
      <div class="badge">G</div>
      <p class="eyebrow">HAPPY ADVENTURE</p>
      <h1>找村长报到</h1>
      <p class="subtitle">创建你的冒险者账号，一起进入奇妙世界</p>

      <form @submit.prevent="register">
        <label>
          <span>冒险者账号</span>
          <input v-model="username" autocomplete="username" maxlength="32" placeholder="3-32 位字母、数字或下划线" />
        </label>
        <label>
          <span>秘密口令</span>
          <input v-model="password" type="password" autocomplete="new-password" maxlength="72" placeholder="至少 6 位" />
        </label>
        <label>
          <span>再次确认口令</span>
          <input v-model="confirmPassword" type="password" autocomplete="new-password" maxlength="72" placeholder="再输入一次密码" />
        </label>
        <button class="submit" type="submit" :disabled="submitting">
          {{ submitting ? '正在报到…' : '完成报到' }}
        </button>
        <p v-if="message" class="message" :class="{ success }">{{ message }}</p>
      </form>
    </section>
    <div class="hill hill-back"></div>
    <div class="hill hill-front"></div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;500;700;900&display=swap');
* { box-sizing: border-box; }
.register-page { position: relative; display: grid; min-height: 100vh; place-items: center; overflow: hidden; padding: 28px 18px; background: linear-gradient(155deg, #fff8c5, #ffdd78 45%, #f7a834); color: #66341c; font-family: 'Noto Sans SC', sans-serif; }
.register-card { position: relative; z-index: 3; width: min(450px, 100%); padding: 35px; border: 3px solid #fff9d6; border-radius: 30px; background: rgba(255, 252, 232, .94); box-shadow: 0 15px 0 rgba(172, 80, 25, .13), 0 20px 42px rgba(147, 67, 22, .2); text-align: center; }
.back { position: absolute; top: 20px; left: 22px; border: 0; background: transparent; color: #bd6a39; font-weight: 700; cursor: pointer; }
.badge { display: grid; width: 58px; height: 58px; margin: 8px auto 10px; place-items: center; border: 4px solid #fff4bc; border-radius: 18px 24px; background: #e95132; color: #fff9da; font: 34px 'ZCOOL KuaiLe', cursive; box-shadow: 0 5px 0 #b6432d; transform: rotate(-8deg); }
.eyebrow { margin: 14px 0 2px; color: #a65d22; font-size: 10px; font-weight: 900; letter-spacing: 2px; }
h1 { margin: 0; color: #d85a35; font: 32px 'ZCOOL KuaiLe', cursive; }
.subtitle { margin: 7px 0 22px; color: #9f7950; font-size: 13px; }
label { display: block; margin-top: 14px; text-align: left; }
label span { display: block; margin: 0 0 6px 4px; color: #8f6748; font-size: 12px; font-weight: 700; }
input { width: 100%; height: 52px; padding: 0 15px; border: 2px solid #f0d9a3; border-radius: 16px; outline: none; background: #fffdf2; color: #68412b; font: 500 14px 'Noto Sans SC', sans-serif; }
input:focus { border-color: #ec8c36; box-shadow: 0 0 0 4px #ffe4a6; }
.submit { width: 100%; margin-top: 22px; padding: 13px; border: 0; border-bottom: 5px solid #b9452e; border-radius: 16px; background: #e96035; color: #fffce1; font: 21px 'ZCOOL KuaiLe', cursive; cursor: pointer; }
.submit:disabled { cursor: wait; opacity: .65; }
.message { min-height: 18px; margin: 13px 0 0; color: #c44932; font-size: 12px; }.message.success { color: #4d8b36; }
.cloud { position: absolute; width: 180px; height: 45px; border-radius: 50px; background: rgba(255,255,230,.66); }.cloud::before,.cloud::after { position: absolute; bottom: 0; border-radius: 50%; background: inherit; content: ''; }.cloud::before { left: 28px; width: 75px; height: 75px; }.cloud::after { right: 20px; width: 56px; height: 56px; }.cloud-one { top: 15%; left: 7%; }.cloud-two { top: 11%; right: 8%; transform: scale(.7); }
.hill { position: absolute; bottom: -145px; width: 65%; height: 260px; border-radius: 50% 50% 0 0; }.hill-back { left: -10%; background: #a1c94c; transform: rotate(4deg); }.hill-front { right: -10%; background: #6daa3e; transform: rotate(-5deg); }
</style>
