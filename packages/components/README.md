# @zk-ui/components

基于 Element Plus 构建的 Vue 3 组件库

## 简介

zk-ui 是一个基于 Element Plus 封装的 Vue 3 组件库，旨在提供更便捷的 UI 组件和工具函数。

## 安装

```bash
npm install @zk-ui/components element-plus
```

或

```bash
yarn add @zk-ui/components element-plus
```

## 使用

### 全局注册

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ZkUI from '@zk-ui/components'
import '@zk-ui/components/dist/style.css'

const app = createApp(App)
app.use(ZkUI)
app.mount('#app')
```

### 按需引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { ZkButton } from '@zk-ui/components'
import '@zk-ui/components/dist/style.css'

const app = createApp(App)
app.component('ZkButton', ZkButton)
app.mount('#app')
```

## 组件列表

- Button (按钮)
- Tag (标签)
- 更多组件正在开发中...

## 文档

详细的组件文档请参考项目文档。

## License

MIT
