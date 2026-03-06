import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// custom theme overrides for docs
// // 导入组件库
import ZkUI from '@zk-ui/components'
import '@zk-ui/components/style.css' // 引入样式
import "./styles/custom.css";
// 通过导入包的入口来模拟下游项目的使用方式，包入口会导入 element-theme.scss
import "../../../packages/components/src/index.js";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.use(ZkUI);
    // 移除全局注册，让 unplugin-vue-components 处理自动导入
  },
};
