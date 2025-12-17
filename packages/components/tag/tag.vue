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
    @close="handleClose"
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot></slot>
  </el-tag>
</template>

<script setup name="ZkTag">
import { ElTag } from 'element-plus'

const props = withDefaults(defineProps(), {
  type: '',
  size: 'default',
  closable: false,
  disableTransitions: false,
  hit: false,
  color: '',
  effect: 'light'
})

const emit = defineEmits(['close', 'click'])

const handleClose = (event) => {
  emit('close', event)
}

const handleClick = (event) => {
  emit('click', event)
}
</script>