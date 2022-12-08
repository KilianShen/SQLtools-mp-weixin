<template>
  <view class="page">
    <view class="menu"></view>
    <view class="swiper"></view>
    <view class="news"></view>
    <view class="tabs">
      <view class="tabs-tab"></view>
      <scroll-view scroll-y class="tabs-scroll" :scroll-top="scrollTop" @scrolltoupper="upper" @scrolltolower="lower">
        <view v-for="(item, index) in state.list" :key="index" class="scroll-item">{{ item }}</view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import Mock from 'mockjs';
// ===================== 私有属性 =====================
const state = reactive({
  list: Array.from({ length: 15 }, () => Mock.Random.cparagraph(2)),
});

// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {});
// ===================== 私有方法 =====================
function scrollTop() {}
function upper() {
  console.log('upper');
}
function lower() {
  console.log('lower');
  const newItems = Array.from({ length: 10 }, () => Mock.Random.cparagraph(2));
  setTimeout(() => {
    state.list = [...state.list, ...newItems];
  }, 1000);
}
</script>

<style lang="scss" scoped>
.page {
  //   overflow: auto;
}
.menu {
  width: 100%;
  height: 250rpx;
  background-color: antiquewhite;
  border: 1px solid #777;
}
.swiper {
  width: 100%;
  height: 250rpx;
  background-color: bisque;
  border: 1px solid #777;
}
.news {
  width: 100%;
  height: 250rpx;
  background-color: blanchedalmond;
  border: 1px solid #777;
}

.tabs {
  &-tab {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: rgba($color: #333, $alpha: 0.3);
    height: 100rpx;
  }
  &-scroll {
    border: 1px solid #f00;
    height: 100vh;
  }
}
.scroll-item {
  width: 100%;
  height: 150rpx;
  background-color: rgba($color: #9fa9d7, $alpha: 0.4);
  border: 1px solid #777;
  text-align: center;
}
</style>
