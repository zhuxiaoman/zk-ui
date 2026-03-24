import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { copyFileSync } from "fs";

// 定义项目根目录
const projectRoot = resolve(__dirname);

export default defineConfig(({ command, mode }) => {
  // 是否为构建模式
  const isBuildMode = command === "build";

  // 插件配置
  const plugins = [
    vue(),
    // 自定义插件：构建时复制 README.md 到 dist 目录
    {
      name: "copy-readme",
      closeBundle() {
        if (isBuildMode) {
          const src = resolve(projectRoot, "README.md");
          const dest = resolve(projectRoot, "dist", "README.md");
          try {
            copyFileSync(src, dest);
          } catch (error) {
            console.warn("Could not copy README.md to dist folder:", error.message);
          }
        }
      },
    },
  ];

  // 构建配置
  const buildConfig = isBuildMode
    ? {
        lib: {
          entry: resolve(projectRoot, "index.js"),
          name: "zk-ui",
          fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
          // 外部化处理不需要打包进库的依赖
          external: ["vue", "element-plus"],
          output: {
            // 为外部依赖提供全局变量
            globals: {
              vue: "Vue",
              "element-plus": "ElementPlus",
            },
            // 资源文件命名规则
            assetFileNames: (assetInfo) => {
              if (assetInfo.name.endsWith(".css")) {
                return "style.css";
              }
              return assetInfo.name;
            },
          },
        },
      }
    : {};

  // 开发服务器配置
  const serverConfig = !isBuildMode
    ? {
        port: 5174,
        host: true,
        open: true,
        headers: {
          "Cache-Control": "public, max-age=31536000",
        },
        hmr: {
          overlay: false,
        },
      }
    : {};

  // 开发模式下的依赖优化配置
  const optimizeDepsConfig = !isBuildMode
    ? {
        include: ["element-plus", "vue"],
      }
    : {};

  return {
    plugins,
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
      },
    },
    build: buildConfig,
    server: serverConfig,
    optimizeDeps: optimizeDepsConfig,
  };
});
