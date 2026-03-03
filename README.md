# zk-ui

基于 Vue 3 和 Element Plus 的 UI 组件库

## 项目结构

- `packages/components`: 组件库源码
- `docs`: 文档网站

## 安装依赖

```bash
pnpm install
```

## 启动文档网站

### 开发模式

```bash
# 进入文档目录
cd docs

# 启动文档开发服务器
pnpm docs:dev
```

访问 http://localhost:5173 查看文档网站。

### 构建文档

```bash
cd docs
pnpm docs:build
```

## 启动组件库应用

### 开发模式

```bash
# 进入组件库目录
cd packages/components

# 启动组件库开发服务器
pnpm dev
```

### 构建组件库

```bash
cd packages/components
pnpm build
```

## 发布组件库

```bash
# 构建组件库
cd packages/components
pnpm build

# 发布到 npm
npm publish --access public
```

## 技术栈

- Vue 3
- Element Plus
- Vite
- VitePress

## 许可证

MIT
