<template>
  <!-- <text>请输入弹幕内容</text> -->
  <input class="input" auto-focus placeholder="请输入弹幕内容" @input="input" />
  <text>文字大小</text>
  <slider @change="sizeChange" min="20" max="50" :value="30" show-value />
  <text>滚动速度</text>
  <slider
    @change="speedChange"
    min="2"
    max="8"
    :value="5"
    step="1"
    show-value
  />
  <text>选择颜色</text>
  <view class="picker">
    <view @click="openTextColorPicker" class="picker_item">
      <view
        class="picker_item_ridio"
        :style="{ background: `${setting.textColor}` }"
      ></view
      ><text>文本颜色</text>
    </view>
    <view @click="openBackgroundColorPicker" class="picker_item">
      <view
        class="picker_item_ridio"
        :style="{
          background: `${setting.backgroundColor}`,
        }"
      ></view
      ><text>背景色</text>
    </view>
  </view>
  <ColorPicker
    ref="textColorPicker"
    @confirm="textColorPikcerConfirm"
  ></ColorPicker>
  <ColorPicker
    ref="backgroundColorPicker"
    @confirm="backgroundColorPikcerConfirm"
  ></ColorPicker>

  <radio-group @change="radioChange">
    <label>
      <radio :value="0" :checked="true"></radio>
      <text>静止弹幕</text>
    </label>
    <label>
      <radio :value="1" :checked="false"></radio>
      <text>滚动弹幕</text>
    </label>
  </radio-group>

  <button @click="showBarrage">显示弹幕</button>
</template>
    
<script setup lang='ts'>
import ColorPicker from "@/widgets/wxy-color-picker_0.0.4/components/wxy-color-picker/wxy-color-picker.vue";
import { onMounted, ref, reactive } from "vue";
import { RouteUtils } from "@/utils/RouteUtils";
// const color = { r: 122, g: 189, b: 154, a: 1 };
let textColorPicker: any = ref(null);
let backgroundColorPicker: any = ref(null);

const setting = reactive({
  text: "(^_^)",
  fontSize: 300,
  rollSpeed: "5s",
  textColor: "#6000ba",
  backgroundColor: "#000",
  isRolling: 0,
});
onMounted(() => {});

const sizeChange = (e: any) => {
  setting.fontSize = e.target.value * 10;
};
const speedChange = (e: any) => {
  setting.rollSpeed = 16 / e.target.value + "s";
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

const radioChange = (e: any) => {
  setting.isRolling = e.target.value === "1" ? 1 : 0;
};

const showBarrage = () => {
  RouteUtils("/tools/barrage/barrageScreen", setting);
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
  const hex: string =
    "#" +
    r.toString(16).slice(-2) +
    g.toString(16).slice(-2) +
    b.toString(16).slice(-2);
  return hex;
};
</script>    

<style lang="scss" scoped>
.input {
  margin-top: 30rpx;
  border-bottom: 6rpx solid #7abd9a;
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
</style>