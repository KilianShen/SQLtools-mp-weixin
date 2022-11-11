<template>
  <input class="input" v-model="value" focus placeholder="在此输入内容" />
  <view class="area">
    <UQRCode
      v-show="false"
      ref="qrcode"
      canvasId="qrcode"
      :value="value || 'null'"
      size="200"
      :options="option"
      fileType="jpg"
      :auto="true"
      @complete="complate"
    >
    </UQRCode>
    <image
      v-if="show"
      :src="TempFilePath"
      :show-menu-by-longpress="true"
      @click="preview"
      style="width: 200px; height: 200px"
    ></image>
    <view v-else class="empty">
      <text>输入内容</text>
      <text>点击生产按钮即可</text>
    </view>
  </view>
  <view class="operation">
    <button @click="create">生成二维码</button>
    <button @click="save">SAVE</button>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, Ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import UQRCode from './Sansnn-uQRCode_3.5.1/components/uqrcode/uqrcode.vue';
//UQRCode: https://github.com/Sansnn/uQRCode
// ===================== 私有属性 =====================
// const value: Ref<string> = ref('https://doc.uqrcode.cn/document/uni-app.html');
const value: Ref<string> = ref('');
const show: Ref<boolean> = ref(false);
const option = reactive({
  backgroundColor: '#c4e5e7',
  foregroundColor: '#3174a0',
  // backgroundImageWidth: 200,
  // foregroundImageBorderRadius: 10,
  // foregroundImageSrc: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
  // foregroundImagePadding: 4,
});

let TempFilePath: Ref<string> = ref('');

const qrcode: IObject = ref({});
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {});
// ===================== 私有方法 =====================

function complate() {
  console.log('complate');
}

function save() {
  qrcode.value.save({
    success: (res: IObject) => {
      console.log('save', res);
    },
  });
}

async function create() {
  await qrcode.value.toTempFilePath({
    success: (res: IObject) => {
      console.log('toTempFilePath', res);
      TempFilePath.value = res.tempFilePath;
    },
  });
  show.value = true;
}

function preview() {
  wx.previewImage({
    current: '', // 当前显示图片的 http 链接
    urls: [TempFilePath.value], // 需要预览的图片 http 链接列表
  });
}
</script>

<style lang="scss" scoped>
.input {
  height: 80rpx;
  border: 1rpx solid #333;
  border-radius: 30rpx;
  margin: 20rpx 30rpx;
}
.area {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30rpx;
}

.empty {
  width: 200px;
  height: 200px;
  border: 1px solid #999;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #999;
}
.operation {
  display: flex;
  flex-direction: row;
  > button {
    width: 40%;
  }
}
</style>
