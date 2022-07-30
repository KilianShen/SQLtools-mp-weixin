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
        <text class="text">{{ item.name }}</text>
        <uni-icons :type="item.type" size="40" :color="item.color"> </uni-icons>
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
          type: "chatbubble-filled",
          color: "#5dd88d",
          path: "/tools/barrage/barrage",
        },
        {
          name: "尺子",
          type: "settings",
          color: "#5dd88d",
        },
        {
          name: "图片水印",
          type: "image-filled",
          color: "#5dd88d",
        },
        {
          name: "九格切图",
          type: "images-filled",
          color: "#5dd88d",
        },
        {
          name: "二维码工具",
          type: "scan",
          color: "#5dd88d",
        },
        {
          name: "地址信息查询",
          type: "location",
          color: "#5dd88d",
        },
        {
          name: "testPage",
          type: "more-filled",
          color: "#5dd88d",
          path: "/pages/testPage/testPage",
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