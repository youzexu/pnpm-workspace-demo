import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['ie >= 11', 'chrome >= 49', 'firefox >= 50', 'safari >= 10'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    // ← 新增
    postcss: './postcss.config.js', // 适配配置
    preprocessorOptions: {
      // Sass/SCSS 配置
      scss: {
        // 全局注入公共变量（每个组件自动引入）
        additionalData: `@import "@/styles/variables.scss";`,
        // 使用现代编译器 API
        api: 'modern-compiler'
      },
      // Less 配置
      less: {
        // 修改全局变量
        modifyVars: {
          'primary-color': '#409eff',
          'success-color': '#67c23a'
        },
        // 启用 JavaScript 内联样式
        javascriptEnabled: true
      }
    }
  },
  server: {
    port: 5173,
    open: true
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // 代码分割
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})