<template>
  <van-tabs :active="current" @change="onChange" title-active-color="#ee0a24">
    <van-tab title="知乎"></van-tab>
    <van-tab title="百度"></van-tab>
    <van-tab title="环球"></van-tab>
  </van-tabs>

  <swiper class="swiper" :autoplay="false" @change="change" :current="current">
    <swiper-item>
      <view class="swiper-item"><ZhiHuList /></view>
    </swiper-item>
    <swiper-item>
      <view class="swiper-item"><BaiduList /></view>
    </swiper-item>
    <swiper-item>
      <view class="swiper-item"><GlobalList /></view>
    </swiper-item>
  </swiper>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import ZhiHuList from './ZhihuList.vue';
import BaiduList from './BaiduList.vue';
import appUtils from '@/utils/appUtils';
import GlobalList from './GlobalList.vue';
// ===================== 私有属性 =====================
let current = ref(0);
let windowHeight: number = wx.getWindowInfo().windowHeight - 44;
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {});
// ===================== 私有方法 =====================
function onChange(e: IObject) {
  current.value = e.detail.index;
}

function change(e: IObject) {
  current.value = e.detail.current;
}

onShareAppMessage((res) => {
  console.log('res', res);
  let shareData;
  if (res.from === 'button') {
    shareData = res.target.dataset.wxsharesetup.shareData;
  }

  const shareObj = {
    title: shareData.word,
    imageUrl: shareData.img,
    path: appUtils.getCurrentPages(),
  };
  console.log('shareObj\n', JSON.stringify(shareObj, null, 2));
  return shareObj;
});
</script>

<style lang="scss" scoped>
.swiper {
  height: v-bind("windowHeight+'px'");
}
</style>
