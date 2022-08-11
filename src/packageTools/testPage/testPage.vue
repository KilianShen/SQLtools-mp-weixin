<template>
  <button @click="choose">choose</button>
  <view>{{ imgUrl }}</view>
  <canvas type="2d" id="myCanvas" class="canvas"></canvas>
  <button @click="save()">save</button>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, Ref, ref, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
// ===================== 私有属性 =====================
let imgUrl: Ref<String> = ref("");
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
      imgUrl.value = res.tempFiles[0].tempFilePath;
      draw(res.tempFiles[0].tempFilePath);

      wx.getImageInfo({
        src: imgUrl.value,
        success: (res: IObject) => {
          console.log("getImageInfo", res);
        },
      });
    },
  });
}

function draw(img: Ref<String> | String) {
  wx.createSelectorQuery()
    .select("#myCanvas") // 在 WXML 中填入的 id
    .fields({ node: true, size: true })
    .exec((res: IObject) => {
      // Canvas 对象
      canvas = res[0].node;
      // 渲染上下文
      const ctx = canvas.getContext("2d");
      // Canvas 画布的实际绘制宽高
      const width = res[0].width;
      const height = res[0].height;
      // 初始化画布大小
      const dpr = wx.getWindowInfo().pixelRatio;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      // 清空画布
      ctx.clearRect(0, 0, width, height);

      drawImage(ctx, canvas, img).then((data) => {
        if (data) {
          setTimeout(() => {
            // 绘制蓝色半透明正方形
            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect(0, 0, 50, 50);
            console.log("正方形");

            // 文字
            ctx.font = "50px system-ui";
            ctx.fillText("Hello world", 10, 50);
          }, 500);
        }
      });
    });
}

function drawImage(ctx: any, canvas: any, img: String | Ref<String>) {
  return new Promise<boolean>((resolve, reject) => {
    // 图片对象
    const image = canvas.createImage();
    // 图片加载完成回调
    image.onload = () => {
      // 将图片绘制到 canvas 上
      ctx.drawImage(image, 0, 0);
    };
    // 设置图片src
    image.src = img;
    console.log("图片绘制完成");
    resolve(true);
  });
}

function save() {
  wx.getSetting({
    success: (res: IObject) => {
      console.log(res.authSetting);
      if (!res.authSetting["scope.writePhotosAlbum"]) {
        wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: (r: IObject) => {
            console.log("r", r);
            canvasToTempFilePath();
          },
          fail: (err: IObject) => {
            console.error("err", err);
          },
        });
      } else {
        canvasToTempFilePath();
      }
    },
  });
}

function canvasToTempFilePath() {
  console.log("canvasToTempFilePath");
  wx.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: 390,
    height: 390,
    destWidth: 390,
    destHeight: 390,
    canvas: canvas,
    success: (r: IObject) => {
      const { tempFilePath = "" } = r;
      console.log("tempFilePath", tempFilePath);
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success() {
          wx.showToast({
            title: "保存成功",
          });
        },
        fail(e: any) {
          console.log("error", e);
          wx.showToast({
            title: "保存失败",
            icon: "none",
          });
        },
      });
    },
    fail: (e: IObject) => {
      console.log("e", e);
    },
  });
}
</script>
    
<style lang="scss" scoped>
.canvas {
  border: 1px solid #000;
  width: 390px;
  height: 390px;
}
</style>