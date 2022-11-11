<template>
  <button @click="chooseMedia">chooseMedia</button>
  <text>{{ tempFilePath }}</text>
  <image :src="tempFilePath"></image>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import appUtils from '@/utils/appUtils';
// ===================== 私有属性 =====================
let tempFilePath = ref('');
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});
onMounted(() => {
  appUtils.log.warn(1, '2', true, [3, 4], { name: '张三' }, JSON.stringify({ name: '李四', age: 12, data: { a: 1, b: 2 } }));
});
// ===================== 私有方法 =====================
function chooseMedia() {
  wx.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success: (res: IObject) => {
      console.log(res.tempFiles[0].tempFilePath);
      wx.cropImage({
        src: res.tempFiles[0].tempFilePath, // 图片路径
        cropScale: '1:1', // 裁剪比例
        success: (res: IObject) => {
          console.log('res', res.tempFilePath);
          tempFilePath.value = res.tempFilePath;
          // console.log("tempFilePath", tempFilePath);
          console.log('tempFilePath.value', tempFilePath.value);
          // wx.getImageInfo({
          //   src: tempFilePath.value,
          //   success: (res: IObject) => {
          //     console.log('getImageInfo', res)
          //   }
          // })
          // wx.saveImageToPhotosAlbum({
          //   filePath: tempFilePath.value,
          //   success: (res: IObject) => {
          //     console.log("saveImageToPhotosAlbum", res);
          //   },
          //   fail: (err: any) => {
          //     console.error("saveImageToPhotosAlbum:", err);
          //   }
          // })
        },
        fail: (err: any) => {
          console.error('err:', err);
        },
      });
    },
  });
}
</script>

<style lang="scss" scoped></style>
