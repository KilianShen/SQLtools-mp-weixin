<template>
  <view class="grid">
    <uni-grid :column="3" :showBorder="false" :square="false">
      <uni-grid-item
        class="grid_item"
        v-for="(item, index) in list"
        :key="index"
      >
        <text class="text">{{ item.name }}</text>
        <uni-icons :type="item.type" size="40" :color="item.color"> </uni-icons>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>
  
<script setup lang='ts'>
import Mock from "mockjs";

let list = [
  {
    name: "手持弹幕",
    type: "chatbubble-filled",
    color: "#5dd88d",
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
];
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