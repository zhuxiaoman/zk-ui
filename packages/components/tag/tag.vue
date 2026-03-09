<!--
 * @Author: zhuxiaoman
 * @Date: 2025-12-12
 * @LastEditors: zhuxiaoman
 * @LastEditTime: 2025-12-12
 * @FilePath: \zk-ui\packages\components\tag\tag.vue
 * @Description: 
-->
<template>
  <el-tag
    :type="props.type"
    :size="props.size"
    :closable="props.closable"
    :disable-transitions="props.disableTransitions"
    :hit="props.hit"
    :color="props.color"
    :effect="props.effect"
    v-bind="$attrs"
    @close="handleClose"
    @click="handleClick"
  >
    <slot></slot>
  </el-tag>
</template>

<script setup name="ZkTag">
import { ElTag } from "element-plus";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "default",
  },
  closable: {
    type: Boolean,
    default: false,
  },
  disableTransitions: {
    type: Boolean,
    default: false,
  },
  hit: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "",
  },
  effect: {
    type: String,
    default: "light",
  },
});

const emit = defineEmits(["close", "click"]);

const handleClose = (event) => {
  emit("close", event);
};

const handleClick = (event) => {
  emit("click", event);
};
</script>
