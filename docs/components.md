## Button 组件

- **渲染示例：**

<zk-button type="primary">primary</zk-button>
<zk-button type="success">success</zk-button>
<zk-button type="info">info</zk-button>
<zk-button type="warning">warning</zk-button>
<zk-button type="danger">danger</zk-button>

- **源码展示：**

```vue
<template>
  <zk-button type="primary">primary</zk-button>
  <zk-button type="success">success</zk-button>
  <zk-button type="info">info</zk-button>
  <zk-button type="warning">warning</zk-button>
  <zk-button type="danger">danger</zk-button>
</template>

<script setup>
// 组件已通过 unplugin-vue-components 自动导入，无需手动导入
</script>
```

## Tag 组件

- **渲染示例：**

<ZkTag>标签</ZkTag>
<br>
<ZkTag type="success">成功标签</ZkTag>
<br>
<ZkTag type="info">信息标签</ZkTag>
<br>
<ZkTag type="warning">警告标签</ZkTag>
<br>
<ZkTag type="danger">危险标签</ZkTag>
<br>
<ZkTag closable>可关闭标签</ZkTag>

- **源码展示：**

```vue
<template>
  <ZkTag>标签</ZkTag>
  <ZkTag type="success">成功标签</ZkTag>
  <ZkTag type="info">信息标签</ZkTag>
  <ZkTag type="warning">警告标签</ZkTag>
  <ZkTag type="danger">危险标签</ZkTag>
  <ZkTag closable>可关闭标签</ZkTag>
</template>

<script setup>
// 组件已通过 unplugin-vue-components 自动导入，无需手动导入
</script>
```
