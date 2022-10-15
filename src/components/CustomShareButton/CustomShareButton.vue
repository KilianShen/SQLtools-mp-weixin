<template>
  <button class="box" open-type="share" plain :data-wxsharesetup="{ shareData }">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';

interface Props {
  shareData: IObject;
}
// ===================== 私有属性 =====================
// 对 defineProps() 的响应性解构, 默认值会被编译为等价的运行时选项
const { shareData = {} } = defineProps<Props>();
// ===================== 生命周期 =====================
onMounted(() => {
  //   console.log('shareData', toRaw(shareData));
});
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped>
.box {
  border: none;
  background-color: #0000;
  padding: 0;
  line-height: inherit;
  font-size: inherit;
}
</style>
