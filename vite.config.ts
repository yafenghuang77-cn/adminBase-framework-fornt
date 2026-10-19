import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  return {
    base: '/adminBase/',
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
      dedupe: ['react', 'react-dom'],
    },
    css: {
      preprocessorMaxWorkers: true,
      devSourcemap: true,
      modules: {
        generateScopedName:
          command === 'build' ? '_[hash:base64:8]' : '[name]__[local]__[hash:base64:5]',
      },
    },

    optimizeDeps: {
      entries: ['index.html'],
      // 显式预打包基础依赖；其他依赖仍会按实际引用自动发现。
      include: [
        'react',
        'react-dom/client',
        'react/jsx-runtime',
        '@tanstack/react-router',
        '@tanstack/react-query',
        '@ant-design/icons',
        '@ant-design/pro-components',
        'antd',
        'react-intl',
        'zustand',
      ],
    },
    server: {
      host: '0.0.0.0',
      port: 8888,
      strictPort: true,
      warmup: {
        clientFiles: ['./src/main.tsx', './src/App.tsx', './src/pages/Home/index.tsx'],
      },
      watch: {
        ignored: ['**/coverage/**', '**/playwright-report/**', '**/test-results/**'],
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') || '/',
        },
      },
    },
    build: {
      target: 'baseline-widely-available',
      outDir: 'adminBase',
      emptyOutDir: true,
      manifest: true,
      sourcemap: true,
      minify: 'oxc',
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      modulePreload: { polyfill: true },
      reportCompressedSize: true,
      chunkSizeWarningLimit: 500,
      rolldownOptions: {
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
          codeSplitting: {
            // 拆出当前已使用的基础库，其余模块保留自动拆分和页面懒加载。
            groups: [
              {
                name: 'react-vendor',
                test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
                priority: 30,
              },
              {
                name: 'router-vendor',
                test: /node_modules[\\/]@tanstack[\\/](?:react-router|router-core|history)[\\/]/,
                priority: 20,
              },
              {
                name: 'intl-vendor',
                test: /node_modules[\\/](?:react-intl|intl-messageformat|@formatjs[\\/][^\\/]+)[\\/]/,
                priority: 10,
              },
            ],
          },
        },
      },
    },
    worker: { format: 'es' },
  };
});
