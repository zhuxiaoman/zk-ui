## 在线演示

<script setup>
import ThemeDemo from './ThemeDemo.vue'
</script>

<ThemeDemo />

---



# 主题切换与自定义颜色

以下示例在当前文档页面即可直接操作，并且会实时观察主题色变化。

---

## 设置主题

在应用启动处或事件中调用：

```js
import { themeUtils } from '@zk-ui/components'

// 切换到深色主题
themeUtils.setTheme('dark')

// 切换到浅色主题
themeUtils.setTheme('light')

// 切换（切换并返回当前主题）
themeUtils.toggleTheme()
```

## 自定义主色

设置自定义主色并会自动生成若干色阶（存储于 localStorage）

```js
themeUtils.setPrimaryColor('#ff6b6b')
```

## 自动初始化

库会在浏览器环境 DOMContentLoaded 时尝试从 localStorage 读取并恢复主题与主色。

::: tip 说明
样式通过 CSS 变量暴露（如 `--el-color-primary`, `--el-bg-color` 等），组件应使用这些变量以支持主题切换。要在页面开启深色主题，可在 `html` 或 `body` 上设置 `data-theme="dark"`。
:::
