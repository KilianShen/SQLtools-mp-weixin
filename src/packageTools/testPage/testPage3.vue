<template>
  <view class="page-section">
    <view class="page-section-title">剪裁</view>
    <button @click="choose">chooseImage</button>

    <movable-area
      v-if="show"
      scale-area
      class="movableArea"
      :style="{ height: `${scaleHeight}px`, width: `${scaleWidth}px` }"
    >
      <image
        :src="originalImg"
        :style="{ height: `${scaleHeight}px`, width: `${scaleWidth}px` }"
      ></image>
      <movable-view
        direction="all"
        @change="onChange"
        @scale="onScale"
        scale
        scale-min="0.5"
        scale-max="4"
        scale-value="1"
        class="movableView"
      >
      </movable-view>
    </movable-area>
  </view>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, toRefs, ref, Ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import store from "@/store";
// ===================== 私有属性 =====================
let originalImg: Ref<string> = ref("");
let scaleWidth: Ref<number> | number = ref(0);
let scaleHeight: Ref<number> | number = ref(0);
let show = ref(false);

// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => {});
// ===================== 私有方法 =====================
function choose() {
  wx.chooseMedia({
    count: 9,
    mediaType: ["image"],
    sourceType: ["album", "camera"],
    camera: "back",
    success: (res: IObject) => {
      let src = res.tempFiles[0].tempFilePath;
      originalImg.value = res.tempFiles[0].tempFilePath;
      wx.getImageInfo({
        src: src,
        success: (res: IObject) => {
          console.log("getImageInfo", res);
          scaleWidth = store.state.systemInfo.systemInfoVal.windowWidth;
          // scaleHeight = res.height * (scaleWidth / res.width);
          console.log("scaleWidth", scaleWidth, "scaleHeight", scaleHeight);
          show.value = true;
        },
      });
    },
  });
}

function onChange(e: IObject) {
  console.log(e.detail);
}

function onScale(e: IObject) {
  console.log(e.detail);
}
</script>
    
<style lang="scss" scoped>
.movableArea {
}
.movableView {
  background: rgba($color: #fff, $alpha: 0.5);
  height: 100px;
  width: 100px;
}
</style>