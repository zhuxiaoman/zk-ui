/*
 * @Author: zhuxiaoman
 * @Date: 2025-10-24 17:05:44
 * @LastEditors: zhuxiaoman
 * @LastEditTime: 2025-10-24 17:23:06
 * @FilePath: \zk-ui\docs\.vitepress\config.mjs
 * @Description:
 */
import { defineConfig } from "vitepress";
import path from "path";
import Components from "unplugin-vue-components/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zk-ui",
  description: "zk-ui文档",
  head: [],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components" },
      // { text: "指南", link: "/guide" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "组件",
        items: [
          { text: '按钮', link: '/componentDocs/button' },
          { text: '标签', link: '/componentDocs/tag' },
          // { text: "Markdown Examples", link: "/markdown-examples" },
          // { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  vite: {
    plugins: [
      Components({
        resolvers: [
          // 自定义 resolver 来处理 ZkButton 和 ZkTag
          (name) => {
            // if (name === 'ZkButton' || name === 'ZkTag') {
            return {
              importName: name,
              path: "@zk-ui/components",
            };
            // }
          },
        ],
        dts: false, // 不生成类型定义
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/], // 在 .vue 和 .md 文件中自动导入
      }),
    ],
    resolve: {
      alias: {
        "@zk-ui/components": path.resolve(
          __dirname,
          "../../packages/components",
        ),
      },
    },
    optimizeDeps: {
      exclude: ['vitepress']
    }
  },
});
