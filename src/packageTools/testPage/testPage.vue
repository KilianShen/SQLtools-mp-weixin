<template>
  <share-element key="avatar" transform>
    <view style="width: 100px; height: 100px; background-color: #999" @click="show = true"></view>
  </share-element>

  <page-container :show="show" @afterleave="show = false">
    <share-element key="avatar" transform>
      <view style="width: 100px; height: 100px; background-color: #999" @click="show = false"></view>
    </share-element>
  </page-container>
  <view style="width: 550rpx; border: 1px solid #333">
    <Tabs :list="[{ name: 'AAA' }, { name: 'BBB' }, { name: 'CCCC' }, { name: 'DDD' }, { name: 'EE' }]" :scrollable="true"></Tabs>
    <view style="height: 100rpx"></view>
    <Tabs
      :list="[{ name: 'AAA' }, { name: 'BBB' }, { name: 'CCCC' }, { name: 'DDD' }, { name: 'EE' }]"
      :scrollable="false"
    ></Tabs>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref, toRefs } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import Tabs from '@/components/Tabs/Tabs.vue';
// ===================== 私有属性 =====================
let show: Ref<boolean> = ref(false);
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {
  wx.checkIsSupportSoterAuthentication({
    success: (res: IObject) => {
      if (res.supportMode.includes('fingerPrint')) {
        wx.startSoterAuthentication({
          requestAuthModes: ['fingerPrint'],
          challenge: '123456',
          authContent: '请用指纹解锁',
          success: (res: IObject) => {
            console.log('Authentication res', res);
          },
        });
      }
    },
  });

  wx.onUserCaptureScreen((res: IObject) => {
    console.log('用户截屏了', res);
  });
});
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped></style>
