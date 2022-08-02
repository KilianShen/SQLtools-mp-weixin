<template>
  <view class="grid">
    <uni-grid
      :column="3"
      :showBorder="false"
      :square="false"
      @change="goToPage"
    >
      <uni-grid-item
        class="grid_item"
        v-for="(item, index) in list"
        :key="index"
        :index="index"
      >
        <i
          :class="`iconfont icon-${item.icon}`"
          :style="`color:${item.color};font-size:80rpx`"
        ></i>
        <text class="text">{{ item.name }}</text>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>
  
<script lang='ts'>
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  data() {
    return {
      list: [
        {
          name: "手持弹幕",
          icon: "shuzi",
          color: "#5dd88d",
          path: "/packageTools/tools/barrage/barrage",
        },
        {
          name: "天气",
          icon: "tianqi",
          color: "#5dd88d",
          path: "/packageTools/tools/weather/weather",
        },
        {
          name: "屏幕时间",
          icon: "Digital-AlarmClock",
          color: "#5dd88d",
          path: "/packageTools/tools/screenTime/screenTime",
        },
        {
          name: "尺子",
          icon: "kaifa",
          color: "#5dd88d",
        },
        {
          name: "图片水印",
          icon: "kaifa",
          color: "#5dd88d",
        },
        {
          name: "九格切图",
          icon: "kaifa",
          color: "#5dd88d",
        },
        {
          name: "二维码工具",
          icon: "kaifa",
          color: "#5dd88d",
        },
        {
          name: "地址信息查询",
          icon: "kaifa",
          color: "#5dd88d",
        },
        {
          name: "testPage",
          icon: "kaifa",
          color: "#5dd88d",
          path: "/packageTools/testPage/testPage",
        },
      ],
    };
  },

  methods: {
    goToPage(e: IObject) {
      const { index } = e.detail;
      const path = this.list[index].path;
      if (!path) {
        return;
      }
      wx.navigateTo({
        url: `${path}`,
        success: () => {
          console.info("navigateToSuccess! PageStack>>", ...getCurrentPages());
        },
        fail: (e: any) => {
          console.error(e);
        },
      });
    },
  },
});
</script>
  
<style scope lang='scss'>
.grid {
  padding: 5vw;
  &_item {
    width: 30vw;
    height: 30vw;
    text-align: center;
    line-height: 80rpx;
  }
}
</style>