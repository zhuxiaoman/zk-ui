<template>
  <div class="theme-demo">
    <p>
      当前主题：<strong>{{ currentTheme }}</strong>
    </p>

    <div class="demo-controls">
      <zk-button type="primary" @click="toggleTheme">切换主题</zk-button>

      <input v-model="color" placeholder="格式：#ff0000" class="demo-input" />
      <zk-button type="primary" @click="applyColor">设置主色</zk-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { themeUtils } from "@zk-ui/components";

const color = ref("");
const currentTheme = ref("light");

onMounted(() => {
  currentTheme.value =
    document.documentElement.getAttribute("data-theme") || "light";
  color.value = themeUtils.getPrimaryColor();
});

function toggleTheme() {
  const next = themeUtils.toggleTheme();
  currentTheme.value = next;
}

function applyColor() {
  if (color.value) {
    themeUtils.setPrimaryColor(color.value);
  }
}
</script>

<style scoped>
.theme-demo {
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-top: 24px;
}

.demo-controls {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  flex-wrap: wrap;
  align-items: center;
}

.demo-input {
  padding: 8px 12px;
  border: 1px solid var(--el-color-primary);
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--vp-c-text-1);
  width: 160px;
}
</style>
