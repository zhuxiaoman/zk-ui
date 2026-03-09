<!--
 * @Author: zhuxiaoman
 * @Date: 2025-10-24 16:03:50
 * @LastEditors: zhuxiaoman
 * @LastEditTime: 2025-10-24 16:39:05
 * @FilePath: \zk-ui\packages\components\button\src\button.vue
 * @Description: 
-->
<template>
  <el-button
    :type="props.type"
    :size="props.size"
    :disabled="props.disabled"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot></slot>
  </el-button>
</template>

<script setup name="ZkButton">
import { ElButton } from "element-plus";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  emit("click", event);
};
</script>
