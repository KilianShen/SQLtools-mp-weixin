<template>
  <input class="input" auto-focus placeholder="请输入弹幕内容" @input="input" />
  <text class="title">文字大小</text>
  <slider @change="sizeChange" min="20" max="50" :value="30" show-value />
  <text class="title">滚动速度</text>
  <slider @change="speedChange" min="2" max="8" :value="5" step="1" show-value />
  <text class="title">选择颜色</text>
  <view class="picker">
    <view @click="openTextColorPicker" class="picker_item">
      <view class="picker_item_ridio" :style="{ background: `${setting.textColor}` }"></view><text>文本颜色</text>
    </view>
    <view @click="openBackgroundColorPicker" class="picker_item">
      <view
        class="picker_item_ridio"
        :style="{
          background: `${setting.backgroundColor}`,
        }"
      ></view>
      <text>背景色</text>
    </view>
  </view>
  <ColorPicker ref="textColorPicker" @confirm="textColorPikcerConfirm"></ColorPicker>
  <ColorPicker ref="backgroundColorPicker" @confirm="backgroundColorPikcerConfirm"></ColorPicker>

  <text class="title">是否滚动</text>
  <switch @change="switchChange" style="margin-left: 30rpx" />
  <text @click="showBarrage" class="btn">显示弹幕</text>
</template>

<script setup lang="ts">
import ColorPicker from '@/widgets/wxy-color-picker_0.0.4/components/wxy-color-picker/wxy-color-picker.vue';
import { onMounted, ref, reactive } from 'vue';
import appUtils from '@/utils/appUtils';
// const color = { r: 122, g: 189, b: 154, a: 1 };
let textColorPicker: any = ref(null);
let backgroundColorPicker: any = ref(null);

const setting = reactive({
  text: '(^_^)',
  fontSize: 300,
  rollSpeed: '5s',
  textColor: '#6000ba',
  backgroundColor: '#000',
  isRolling: 0,
});
onMounted(() => {});

const sizeChange = (e: any) => {
  setting.fontSize = e.target.value * 10;
};
const speedChange = (e: any) => {
  setting.rollSpeed = 16 / e.target.value + 's';
};

const openTextColorPicker = (item: any) => {
  textColorPicker.value.open();
};
const openBackgroundColorPicker = (item: any) => {
  backgroundColorPicker.value.open();
};
const textColorPikcerConfirm = (e: any) => {
  setting.textColor = RGBA2HEX(e.rgba);
};
const backgroundColorPikcerConfirm = (e: any) => {
  setting.backgroundColor = RGBA2HEX(e.rgba);
};

const input = (e: any) => {
  setting.text = e.target.value;
};

const switchChange = (e: any) => {
  setting.isRolling = e.detail.value ? 1 : 0;
};

const showBarrage = () => {
  appUtils.push('/packageTools/tools/barrage/barrageScreen', setting);
};
/**
 * @desp rgba2Hex
 * @params {r:255,g:0,b:0,a:'0.4'}
 */
const RGBA2HEX = (rgba: IObject): string => {
  let { r, g, b, a = 1 } = rgba;
  r = Math.fround(a * parseInt(r) + (1 - a) * 255);
  g = Math.fround(a * parseInt(g) + (1 - a) * 255);
  b = Math.fround(a * parseInt(b) + (1 - a) * 255);
  const hex: string = '#' + r.toString(16).slice(-2) + g.toString(16).slice(-2) + b.toString(16).slice(-2);
  return hex;
};
</script>

<style lang="scss" scoped>
.input {
  margin: 60rpx 30rpx 30rpx 30rpx;
  border-bottom: 6rpx solid #7abd9a;
}

.title {
  display: block;
  margin: 60rpx 30rpx 10rpx 30rpx;
}

.picker {
  display: flex;

  &_item {
    display: flex;
    margin: 30rpx 60rpx;

    &_ridio {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      margin-right: 30rpx;
    }
  }
}

.btn {
  display: block;
  width: 90%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background: #7abd9a;
  margin: 30rpx 5%;
  border-radius: 50rpx;
  color: #fff;
}
</style>
