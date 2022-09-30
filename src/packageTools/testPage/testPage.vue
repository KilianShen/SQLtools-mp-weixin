<template>
  <view>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <button @click="Authentication">fingerPrint</button>
    <button @click="show = !show">page-container</button>
    <share-element key="test1" transform>
      <view style="width: 100rpx; height: 100rpx; background: #29da71"></view>
    </share-element>
    <page-container
      :show="show"
      :overlay="false"
      position="bottom"
      :round="true"
      :close-on-slideDown="true"
      @afterleave="show = false"
    >
      <view
        style="
          width: 100%;
          height: 60vh;
          background: #777;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 10rpx;
        "
      >
        <view style="height: 10rpx; width: 200rpx; background: #fff; border-radius: 10rpx"></view>
        <share-element key="test1" transform>
          <view style="width: 100rpx; height: 100rpx; background: #29da71"></view>
        </share-element>
      </view>
    </page-container>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref, toRefs } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// ===================== 私有属性 =====================
let show: Ref<boolean> = ref(false);
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {
  wx.checkIsSupportSoterAuthentication({
    success: (res: IObject) => {
      console.log('checkIsSupportSoterAuthentication:', res);
    },
  });

  wx.onUserCaptureScreen((res: IObject) => {
    console.log('用户截屏了', res);
  });
});
// ===================== 私有方法 =====================
function Authentication() {
  wx.startSoterAuthentication({
    requestAuthModes: ['fingerPrint'],
    challenge: '123456',
    authContent: '请用指纹解锁',
    success: (res: IObject) => {
      console.log('Authentication res', res);
    },
  });
}
</script>

<style lang="scss" scoped></style>
