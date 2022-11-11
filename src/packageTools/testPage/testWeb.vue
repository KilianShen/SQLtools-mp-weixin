<template>
  <button size="mini" :plain="true" open-type="share" :data-time="Date.now()" :data-userId="'007'">SHARE</button>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import appUtils from '@/utils/appUtils';
import Mock from 'mockjs';
// ===================== 私有属性 =====================

// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
  wx.showShareMenu({
    withShareTicket: false,
    menus: ['shareAppMessage', 'shareTimeline'],
  });
});

onMounted(() => {
  const mockData = Mock.mock({
    'list|6-10': [
      {
        'id|+1': 0,
        khxm: () => Mock.mock('@cname()'),
        phone: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[5-9]))\d{8}$/,
        khh: Mock.Random.integer(100000000, 999999999),
      },
    ],
  });
  // console.log('mockData.list\n', JSON.stringify(mockData.list, null, 2));
});

onShareAppMessage((res: any) => {
  console.log('res\n', JSON.stringify(res, null, 2));
  const shareObj = {
    title: 'ShareTitle',
    imageUrl: '',
    path: appUtils.urlAddParams(appUtils.getCurrentPages(), { userId: res.target.dataset.userid, extraData: 'someData' }),
  };
  console.log('shareObj\n', JSON.stringify(shareObj, null, 2));
  return shareObj;
});

// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped></style>
