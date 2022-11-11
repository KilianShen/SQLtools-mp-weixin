<template>
  <view class="tooltip">
    <view @click="click">
      <slot name="head"></slot>
    </view>
    <view class="tooltip-popup" @click="choose">
      <slot name="content"></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';

interface Props {
  list: string[];
}
// ===================== 私有属性 =====================
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
});

let show = ref(false);
// ===================== 生命周期 =====================
onMounted(() => {
  console.log('item', props.list);
});
// ===================== 私有方法 =====================
function click() {
  show.value = !show.value;
}

function choose() {
  show.value = false;
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: inline-block;
  &-popup {
    z-index: 1;
    display: v-bind("show?'block':'none'");
    position: absolute;
    left: 0;
    background-color: #fff;
    box-shadow: 0 0 4rpx 4rpx #e1e1e1;
    border-radius: 8px;
    font-size: 12px;
    text-align: left;
    line-height: 16px;
    padding: 12px;
    &-item {
      display: block;
    }
  }
}
</style>
