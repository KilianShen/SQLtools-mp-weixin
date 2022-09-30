<template>
  <view :class="setting.isRolling === '1' ? 'pageMove' : 'pageStatic'">
    <view
      :style="{
        color: `${setting.textColor}`,
        fontSize: `${setting.fontSize}rpx`,
      }"
      >{{ setting.text }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
const state: IObject = reactive({
  setting: {},
});
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
  state.setting = pageParams;
});
onMounted(() => {});
const { setting } = toRefs(state);
</script>

<style lang="scss" scoped>
.pageStatic {
  height: 100vw;
  width: 100vh;
  background: v-bind('setting.backgroundColor');
  position: relative;
  left: 100vw;
  transform: rotate(90deg);
  transform-origin: top left;
  display: flex;
  align-items: center;
  justify-content: center;
  > view {
    text-align: center;
  }
}

.pageMove {
  height: 100vw;
  width: 100vh;
  background: v-bind('setting.backgroundColor');
  position: relative;
  left: 100vw;
  transform: rotate(90deg);
  transform-origin: top left;
  display: flex;
  align-items: center;
  overflow: hidden;
  > view {
    animation: v-bind('setting.rollSpeed') wordsLoop linear infinite normal;
    display: inline-block;
    white-space: nowrap;
  }
}

@keyframes wordsLoop {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vh);
  }
}
</style>
