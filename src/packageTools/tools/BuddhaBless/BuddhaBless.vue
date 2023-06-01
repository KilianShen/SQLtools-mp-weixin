<template>
  <view class="page">
    <text class="count">功德:{{ count }}</text>
    <view :animation="state.animationData" class="add"> +1 </view>
    <view class="assembly" @click="throttledClick">
      <view class="woodenFish"></view>
      <view class="mallet">
        <view class="mallet_ball"></view>
        <view class="mallet_stick"></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { throttle, DebouncedFunc } from 'lodash-es';

// ===================== 私有属性 =====================
const state: IObject = reactive({
  animation: {},
  animationData: {},
});

let count = ref(0);

const throttledClick: DebouncedFunc<() => void> = throttle(click, 200);
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => { });

//节流防抖
function click() {
  playAudio();
  animation();
  count.value++;
}

function animation() {
  var _animation = uni.createAnimation({
    duration: 100,
    timingFunction: 'ease',
    transformOrigin: '50% 50%',
  });
  state.animation = _animation;
  _animation.opacity(1).scale(1.3, 1.3).translate(0, -40).opacity(0.05).step();
  state.animationData = _animation.export();

  setTimeout(() => {
    var _animation2 = uni.createAnimation({
      duration: 0,
      timingFunction: 'step-end',
      transformOrigin: '50% 50%',
    });
    _animation2.scale(1, 1).translate(0, 0).opacity(1).step();
    state.animationData = _animation2.export();
  }, 100);
}

function playAudio() {
  console.log('play');
  const innerAudioContext = uni.createInnerAudioContext();
  innerAudioContext.autoplay = true;
  let audioSrc = '/static/3692.mp3';
  innerAudioContext.src = audioSrc;
}

// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  background: #000;
}

.count {
  display: flex;
  flex-direction: row-reverse;
  color: #fff;
  font-size: 50rpx;
  padding-right: 100rpx;
}

.assembly {
  height: 500rpx;
  position: relative;
}

.woodenFish {
  position: absolute;
  // width: 725rpx;
  // height: 550rpx;
  width: 507rpx;
  height: 385rpx;
  background: #fff;
  // 画图
  clip-path: polygon(60% 0%,
      65% 1%,
      70% 2%,
      81% 7%,
      85% 12%,
      88% 15%,
      90% 19%,
      91% 20%,
      92% 22%,
      93% 24%,
      94% 26%,
      95% 28%,
      94% 30%,
      92% 32%,
      88% 34%,
      80% 36%,
      70% 39%,
      65% 40%,
      60% 42%,
      55% 43%,
      50% 45%,
      45% 46%,
      40% 48%,
      35% 51%,
      30% 55%,
      29% 57%,
      28.5% 59%,
      29% 60%,
      30% 62%,
      32% 64%,
      34% 64%,
      36% 63%,
      40% 60%,
      50% 53%,
      60% 47%,
      65% 44%,
      70% 42%,
      80% 39%,
      90% 36.5%,
      95% 37%,
      96% 38%,
      98% 42%,
      99% 48%,
      99.5% 60%,
      98.5% 70%,
      97% 75%,
      95% 80%,
      89% 89%,
      86% 92%,
      75% 96%,
      65% 98%,
      60% 99%,
      55% 99.5%,
      50% 99%,
      47% 98.5%,
      40% 97%,
      30% 93.5%,
      25% 91.5%,
      20% 90%,
      15% 88%,
      10% 87%,
      5% 88%,
      3% 86%,
      2% 85%,
      1% 82%,
      0% 76%,
      1% 74%,
      3% 70%,
      5% 67%,
      8% 62%,
      12% 50%,
      15% 43%,
      20% 34%,
      25% 25%,
      30% 17%,
      35% 12%,
      40% 6%,
      45% 3%,
      50% 2%,
      60% 0%);
}

.mallet {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  transform: rotate(-45deg);
  right: 150rpx;

  &_ball {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #fff;
  }

  &_stick {
    margin-top: -5rpx;
    width: 30rpx;
    height: 300rpx;
    background: #fff;
    clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
    border-radius: 20rpx;
    position: relative;
    overflow: visible;
  }
}

.add {
  width: 100%;
  height: max-content;
  text-align: center;
  margin: 100rpx 0;
  font-size: 80rpx;
  font-weight: bold;
  color: #fff;
}
</style>
