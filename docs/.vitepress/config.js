import { defineConfig } from "vitepress";
import path from "path";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  title: "zk-ui",
  description: "zk-ui 文档",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components" },
    ],
    sidebar: [
      {
        text: "组件总览",
        items: [{ text: "组件总览", link: "/components" }],
      },
      {
        text: "基础组件",
        items: [
          { text: "按钮", link: "/componentDocs/button" },
          { text: "标签", link: "/componentDocs/tag" },
          { text: "主题", link: "/componentDocs/theme" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  vite: {
    plugins: [
      Components({
        resolvers: [
          (name) => {
            if (name.startsWith("Zk")) {
              return { importName: name, path: "@zk-ui/components" };
            }
          },
        ],
        dts: false,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
    ],
    resolve: {
      alias: {
        // "@zk-ui/components": path.resolve(
        //   __dirname,
        //   "../../packages/components",
        // ),
      },
    },
    optimizeDeps: { exclude: ["vitepress"] },
  },
  server: {
    port: 5173,
    host: false,
    open: true,
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
    hmr: {
      overlay: false,
    },
  },
});
