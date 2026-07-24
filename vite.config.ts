import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // 关键配置：适配 GitHub Pages 路径
  base: '/GGBond/', // GitHub Pages 项目仓库路径
  build: {
    // 打包输出目录（默认是 dist，不用改，后续上传这个目录的文件）
    outDir: 'dist',
    emptyOutDir: true // 打包前清空 dist 目录
  }
})
