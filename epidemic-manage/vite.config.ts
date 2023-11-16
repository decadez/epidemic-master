import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from '@arco-plugins/vite-plugin-svgr'
import vitePluginForArco from '@arco-plugins/vite-react'
import setting from './src/settings.json'

var baseUrl = "http://localhost:8080";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
    proxy: {
      '/webapi': {
        target: baseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webapi/, 'webapi'),
      },
      '/images': {
        target: baseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, 'images'),
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {},
    }),
    vitePluginForArco({
      theme: '@arco-themes/react-arco-pro',
      modifyVars: {
        'arcoblue-6': setting.themeColor,
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
