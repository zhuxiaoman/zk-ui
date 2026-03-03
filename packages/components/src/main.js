import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/element-theme.scss";
import ZkButton from "../button/index.js";

const app = createApp();

app.use(ElementPlus);
app.component("zk-button", ZkButton);
app.mount("#app");
