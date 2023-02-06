<template>
  <view class="grid">
    <view class="grid_item" v-for="(item, index) in list" :key="index" :index="index" @click="goToPage(index)">
      <view :class="`iconfont icon-${item.icon}`" :style="`color:${item.color};font-size:80rpx`"></view>
      <text class="text">{{ item.name }}</text>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
export default defineComponent({
  data() {
    return {
      list: [
        {
          name: '手持弹幕',
          icon: 'shuzi',
          color: '#5dd88d',
          path: '/packageTools/tools/barrage/barrage',
        },
        {
          name: '屏幕时间',
          icon: 'Digital-AlarmClock',
          color: '#5dd88d',
          path: '/packageTools/tools/screenTime/screenTime',
        },
        // {
        //   name: '词云图',
        //   icon: 'ciyuntu',
        //   color: '#5dd88d',
        //   path: '/packageTools/tools/wordsMap/wordsMap',
        // },
        {
          name: '天气',
          icon: 'tianqi',
          color: '#5dd88d',
          path: '/packageTools/tools/weather/weather',
        },
        {
          name: '历史上的今天',
          icon: 'jintian',
          color: '#5dd88d',
          path: '/packageTools/tools/eventHistory/eventHistory',
        },
        {
          name: '翻译',
          icon: 'fanyi',
          color: '#5dd88d',
          path: '/packageTools/tools/translate/translate',
        },
        {
          name: '热搜榜',
          icon: 'resou',
          color: '#5dd88d',
          path: '/packageTools/tools/hotList/hotList',
        },
        {
          name: 'QRcode',
          icon: 'erweima',
          color: '#5dd88d',
          path: '/packageTools/tools/QRcode/QRcode',
        },
        {
          name: '电子木鱼',
          icon: 'muyu',
          color: '#5dd88d',
          path: '/packageTools/tools/BuddhaBless/BuddhaBless',
        },
        {
          name: '做个决定',
          icon: 'zhuanpanshezhi',
          color: '#5dd88d',
          path: '/packageTools/tools/Turntable/Turntable',
        },
        // {
        //   name: '图片剪裁',
        //   icon: 'kaifa',
        //   color: '#5dd88d',
        //   path: '/packageTools/testPage/testPage3',
        // },
        // {
        //   name: 'testPage',
        //   icon: 'kaifa',
        //   color: '#5dd88d',
        //   path: '/packageTools/testPage/testPage',
        // },
        // {
        //   name: 'testPage3',
        //   icon: 'kaifa',
        //   color: '#5dd88d',
        //   path: '/packageTools/testPage/testPage3',
        // },
        // {
        //   name: 'testWeb',
        //   icon: 'kaifa',
        //   color: '#5dd88d',
        //   path: '/packageTools/testPage/testWeb',
        // },
      ],
    };
  },

  methods: {
    goToPage(idx: number) {
      const path = this.list[idx].path;
      if (!path) {
        return;
      }
      uni.navigateTo({
        url: `${path}`,
        success: () => {
          console.info('navigateToSuccess! PageStack>>', ...getCurrentPages());
        },
        fail: (e: any) => {
          console.error(e);
        },
      });
    },
  },
});
</script>

<style scoped lang="scss">
.grid {
  padding: 5vw;
  display: flex;
  flex-wrap: wrap;

  &_item {
    width: 30vw;
    height: 30vw;
    text-align: center;
    line-height: 80rpx;
  }
}
</style>
