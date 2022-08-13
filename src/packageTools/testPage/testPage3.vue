<template>
  <view class="page-section">
    <button @click="choose">chooseImage</button>
    <button @click="save">save</button>

    <movable-area v-if="state.show" scale-area class="movableArea"
      :style="{ height: `${state.scaleHeight}px`, width: `${state.scaleWidth}px` }">
      <image :src="state.originalImg" :style="{ height: `${state.scaleHeight}px`, width: `${state.scaleWidth}px` }">
      </image>
      <movable-view direction="all" @change="onChange" @scale="onScale" scale scale-min="0.5"
        :scale-max="state.scaleMax" :x="state.movableX" :y="state.movableY" class="movableView"
        :style="{ height: `${state.clipSize}px`, width: `${state.clipSize}px` }">
      </movable-view>
    </movable-area>

    <canvas class="canvas" type="2d" id="canvasImg"
      :style="{ width: `${state.scaleWidth}px`, height: `${state.scaleHeight}px` }">
    </canvas>
  </view>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, ref, Ref, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import store from "@/store";
// ===================== 私有属性 =====================
const state = reactive({
  originalImg: '',
  scaleWidth: 0,
  scaleHeight: 0,
  scaleMax: 1,
  clipSize: 200,
  show: false,
  movableX: 0,
  movableY: 0,
  movableScale: 1,
})

// Canvas 对象
let canvas: any = reactive({});

// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => { });
// ===================== 私有方法 =====================
function choose() {
  wx.chooseMedia({
    count: 9,
    mediaType: ["image"],
    sourceType: ["album", "camera"],
    camera: "back",
    success: (res: IObject) => {
      let src = res.tempFiles[0].tempFilePath;
      state.originalImg = res.tempFiles[0].tempFilePath;
      wx.getImageInfo({
        src: src,
        success: (res: IObject) => {
          // 图片缩放到屏宽显示
          state.scaleWidth = store.state.systemInfo.systemInfoVal.windowWidth;
          state.scaleHeight = Math.round(res.height * (state.scaleWidth / res.width));
          state.clipSize = state.scaleHeight > 200 ? 200 : state.scaleHeight;
          state.scaleMax = Math.min(state.scaleWidth / state.clipSize, state.scaleHeight / state.clipSize);
          console.log("scaleWidth", state.scaleWidth, "scaleHeight", state.scaleHeight, 'scaleMax', state.scaleMax);
          // 剪裁框置中
          state.movableX = (state.scaleWidth - state.clipSize) / 2;
          state.movableY = (state.scaleHeight - state.clipSize) / 2;
          state.show = true;

          const query = wx.createSelectorQuery()
          query.select('#canvasImg')
            .fields({ node: true, size: true })
            .exec((res: IObject) => {
              canvas = res[0].node
              const ctx = canvas.getContext('2d')
              canvas.width = state.scaleWidth;
              canvas.height = state.scaleHeight;
              // 图片对象
              const image = canvas.createImage()
              // 图片加载完成回调
              image.onload = () => {
                // 将图片绘制到 canvas 上
                ctx.drawImage(image, 0, 0, state.scaleWidth, state.scaleHeight)
              }
              // 设置图片src
              image.src = src;
            })
        },
      });
    },
  });
}

function save() {
  wx.canvasToTempFilePath({
    x: state.movableX,
    y: state.movableY,
    width: state.clipSize * state.movableScale,
    height: state.clipSize * state.movableScale,
    canvas: canvas,
    success: (res: IObject) => {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: (res: IObject) => {
          console.log('save success', res);
        },
        fail: (err: any) => {
          console.error('err:', err);
        }
      })
    }
  })

}

/** 剪裁框位置改变 */
function onChange(e: IObject) {
  state.movableX = e.detail.x;
  state.movableY = e.detail.y;
}
/** 剪裁框缩放 */
function onScale(e: IObject) {
  state.movableX = e.detail.x;
  state.movableY = e.detail.y;
  state.movableScale = e.detail.scale || 1;
}
</script>
    
<style lang="scss" scoped>
.movableView {
  box-sizing: border-box;
  border: 2px solid #5dd88d;
}

.canvas {
  // display: none;
  // opacity: 0;
}
</style>