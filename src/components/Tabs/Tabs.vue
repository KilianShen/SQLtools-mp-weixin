<template>
  <view class="tabs">
    <text
      class="tabs-tab"
      v-for="(item, index) in list"
      :key="index"
      @click="click(index)"
      :style="{
        fontWeight: current === index ? 'bolder' : 'normal',
        color: current === index ? activeColor : '#777',
        fontSize: current === index ? '30rpx' : '28rpx',
      }"
    >
      {{ item.name }}
    </text>
  </view>
  <view class="bar"></view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw, watch } from 'vue';

interface Props {
  list: { name: string }[];
  barWidth?: number;
  activeColor?: string;
  active?: number;
}
// ===================== 私有属性 =====================
watch(
  () => props.active,
  (newVal) => {
    left.value = (newVal! + 0.5) * (750 / props.list.length) - props.barWidth / 2;
  }
);

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  barWidth: 60,
  activeColor: '#db3f3f',
});

const emit = defineEmits<{ (e: 'onChange', index: number): void }>();

const left = ref(750 / props.list.length / 2 - props.barWidth / 2);
const current = ref(0);
// ===================== 生命周期 =====================
onMounted(() => {});
// ===================== 私有方法 =====================
function click(idx: number) {
  emit('onChange', idx);
  current.value = idx;
  left.value = (idx + 0.5) * (750 / props.list.length) - props.barWidth / 2;
}
</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  &-tab {
    flex: 1;
    text-align: center;
  }
}
.bar {
  margin-top: 6rpx;
  margin-bottom: 6rpx;
  height: 8rpx;
  width: v-bind("barWidth+'rpx'");
  background-color: v-bind(activeColor);
  transform: v-bind("'translateX('+left+'rpx)'");
  transition: all 0.25s ease-in-out;
  border-radius: 8rpx;
}
</style>
