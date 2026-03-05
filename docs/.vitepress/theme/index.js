import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// custom theme overrides for docs
import "./styles/custom.css";
// 通过导入包的入口来模拟下游项目的使用方式，包入口会导入 element-theme.scss
import "../../../packages/components/src/index.js";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    // 移除全局注册，让 unplugin-vue-components 处理自动导入
  },
};
