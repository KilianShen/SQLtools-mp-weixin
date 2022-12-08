<template>
  <view class="outer">
    <scroll-view :scroll-x="scrollable" class="scroll" :scroll-left="scrollLeft" scroll-with-animation>
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
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, getCurrentInstance } from 'vue';
import appUtils from '@/utils/appUtils';

interface Props {
  list: { name: string }[];
  barWidth?: number;
  activeColor?: string;
  active?: number;
  scrollable?: boolean;
}
// ===================== 私有属性 =====================
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  barWidth: 60,
  activeColor: '#db3f3f',
  active: 0,
  scrollable: false,
});

watch(
  () => props.active,
  (newVal) => {
    left.value = props.scrollable
      ? (newVal! + 0.5) * 150 - props.barWidth / 2
      : (newVal! + 0.5) * (tabsWidth.value! / props.list.length) - props.barWidth / 2;
    setTimeout(() => (current.value = newVal!), 250);
  }
);

const emit = defineEmits<{ (e: 'onChange', index: number): void }>();

const tabsWidth = ref<number | null>(null);
const left = ref(0);
const current = ref(0);
const scrollLeft = ref(0);
// ===================== 生命周期 =====================
onMounted(() => {
  //由于vue3组合式中没有暴露this，所以使用uni.createSelectorQuery().in(this)时会报错, 可用getCurrentInstance()方法获取组件实例
  const view = uni.createSelectorQuery().in(getCurrentInstance()).select('.outer');
  view
    .boundingClientRect((data: IObject) => {
      tabsWidth.value = appUtils.pxToRpx(data.width);
      left.value = props.scrollable
        ? 150 / 2 - props.barWidth / 2
        : tabsWidth.value! / props.list.length / 2 - props.barWidth / 2;
    })
    .exec();
});
// ===================== 私有方法 =====================
function click(idx: number) {
  emit('onChange', idx);
  current.value = idx;
  scrollLeft.value = idx > 1 ? 150 * idx : 0;
  left.value = props.scrollable
    ? (idx + 0.5) * 150 - props.barWidth / 2
    : (idx + 0.5) * (tabsWidth.value! / props.list.length) - props.barWidth / 2;
}
</script>

<style lang="scss" scoped>
.outer {
  width: v-bind("tabsWidth+'rpx'");
}

.scroll {
  white-space: nowrap;
}

.tabs {
  width: 100%;
  display: flex;
  &-tab {
    flex: 1;
    min-width: v-bind("scrollable?'150rpx':'auto'");
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
