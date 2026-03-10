import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { copyFileSync } from "fs";

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    {
      name: "copy-readme",
      closeBundle() {
        if (command === "build") {
          const src = resolve(__dirname, "README.md");
          const dest = resolve(__dirname, "dist", "README.md");
          try {
            copyFileSync(src, dest);
          } catch (error) {
            console.warn("Could not copy README.md to dist folder:", error.message);
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  ...(command === "build"
    ? {
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
                "element-plus": "ElementPlus",
              },
            },
          },
        },
      }
    : {}),
  server: {
    port: 5174,
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
