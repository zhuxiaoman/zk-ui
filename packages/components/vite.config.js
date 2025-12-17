import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  ...(command === 'build' ? {
    build: {
      lib: {
        entry: resolve(__dirname, "index.js"),
        name: "zk-ui",
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ["vue", "element-plus"],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  } : {}),
  server: {
    port: 5173,
    host: true,
    open: true,
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
    hmr: {
      overlay: false,
    },
  },
}));
