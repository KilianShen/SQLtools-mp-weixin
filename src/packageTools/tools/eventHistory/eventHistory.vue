<template>
  <view>
    <uni-dateformat :date="Date.now()" format="MM-dd" class="today"></uni-dateformat>
    <view v-for="(item, index) in state.eventList" :key="index" class="item">
      <text class="item_year">{{ item.year }}</text>
      <rich-text class="item_title" :nodes="item.title"></rich-text>
      <rich-text :nodes="item.desc"></rich-text>
      <image class="item_cover" v-if="item.cover" :src="item.pic_share"></image>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRefs } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import dayjs from 'dayjs';
// ===================== 私有属性 =====================
const state: IObject = reactive({
  eventList: [],
});
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {
  let month = dayjs().format('MM');
  let day = dayjs().format('DD');
  console.log(month, day);
  eventsOnHistory(month, day);
});
// ===================== 私有方法 =====================
function eventsOnHistory(month: string, day: string) {
  uni.showLoading({
    title: '加载中',
    mask: true,
  });
  uni.request({
    url: `https://baike.baidu.com/cms/home/eventsOnHistory/${month}.json`,
    success: (res: IObject) => {
      state.eventList = res.data[month][`${month + day}`].reverse();
      // console.log('eventList\n', JSON.stringify(state.eventList, null, 2));
    },
    complete: () => {
      uni.hideLoading();
    },
  });
}
</script>

<style lang="scss" scoped>
.today {
  display: block;
  width: 50%;
  margin: 30rpx auto;
  text-align: center;
  font-size: 80rpx;
  font-weight: 900;
  color: #333;
  border-radius: 50rpx;
  background: #a9f7c7;
  box-shadow: 21rpx 21rpx 42rpx #7bd39c, -21rpx -21rpx 42rpx #a7ffd4;
}

@media (prefers-color-scheme: dark) {
  .item {
    background: #424242;
  }
}

.item {
  margin: 30rpx;
  padding: 20rpx;
  position: relative;

  border-radius: 30rpx;
  box-shadow: 20rpx 20rpx 60rpx #bebebe, -20rpx -20rpx 60rpx #ffffff;

  &_year {
    text-align: center;
    font-size: 100rpx;
    font-weight: bold;
    position: absolute;
    right: 10rpx;
    top: -20rpx;
    color: rgba(0, 100, 0, 0.25);
  }

  &_title {
    display: block;
    font-weight: bold;
    opacity: 0.8;
    padding: 15rpx 0;
  }

  &_cover {
    width: 100%;
  }
}
</style>
