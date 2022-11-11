<template>
  <view class="title">
    <text class="title_text" @click="show = true">{{ state.list[activeIndex].title }}</text>
    <CustomPopover>
      <template #head>
        <uni-icons type="settings" size="30"></uni-icons>
      </template>
      <template #content>
        <view class="popover-content">
          <text @click="edit()">编辑转盘</text>
          <text @click="addNew()">创建新转盘</text>
        </view>
      </template>
    </CustomPopover>
  </view>
  <view class="whole">
    <view :class="className">
      <text
        class="text"
        :style="{ transform: `rotate(${(360 / state.list[activeIndex].items.length) * (index + 0.5)}deg) translateX(-50%)` }"
        v-for="(item, index) in state.list[activeIndex].items"
        :key="index"
      >
        {{ item }}
      </text>
    </view>
    <view class="center" @click="turn">
      <view class="center-pointer"></view>
    </view>
  </view>
  <page-container :show="show" round @leave="show = false">
    <view class="pop-top">
      <text class="pop-top-title">转盘</text>
      <uni-icons type="closeempty" size="30" @click="show = false"></uni-icons>
    </view>
    <view class="pop-list">
      <text class="pop-list-item" @click="choose(index)" v-for="(item, index) in state.list" :key="index">
        {{ item.title }}
      </text>
    </view>
  </page-container>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import Mock from 'mockjs';
import CustomPopover from '@/components/CustomPopover/CustomPopover.vue';
import Router from '@/utils/module/Router';
import appUtils from '@/utils/appUtils';
import { mainStore } from '@/store';
// ===================== 私有属性 =====================
let className = ref('turntable');
const state = reactive({
  list: [
    {
      title: '下午做什么',
      items: ['读书学习', '打游戏', '看电影', '逛街', '打台球'],
    },
    {
      title: '约她出去吗',
      items: ['约', '不约'],
    },
    {
      title: '掷骰子',
      items: ['.', '..', '...', '....', '.....', '......'],
    },
  ],
});
let activeIndex = ref(0);
let show = ref(false);
let styleStr = ref('');
let rotate = ref(0);
const color = ['#3047b8', '#deb2ea', '#abd3ff'];
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
  if (uni.getStorageSync('turnTableList')) {
    mainStore().turnTableList = uni.getStorageSync('turnTableList');
  } else {
    mainStore().turnTableList = state.list;
  }
});

onShow(() => {
  state.list = mainStore().turnTableList;
  choose();
});

onMounted(() => {
  choose();
});
// ===================== 私有方法 =====================
function turn() {
  rotate.value =
    360 * 6 +
    180 / state.list[activeIndex.value].items.length -
    (360 / state.list[activeIndex.value].items.length) * Mock.Random.integer(1, state.list[activeIndex.value].items.length);
  className.value = '';
  setTimeout(() => {
    className.value = 'turntable';
  }, 50);
}

function choose(index: number = 0) {
  activeIndex.value = index;
  styleStr.value = '';
  let angle = 360 / state.list[activeIndex.value].items.length;
  let _color = '';
  for (let i = 0; i < state.list[activeIndex.value].items.length; i++) {
    if (state.list[activeIndex.value].items.length % 2 === 1) {
      _color = i < state.list[activeIndex.value].items.length - 1 ? color[i % 2] : color[2];
    } else {
      _color = color[i % 2];
    }
    styleStr.value += _color + ' ' + i * angle + 'deg ' + (i + 1) * angle + 'deg,';
  }
  styleStr.value = styleStr.value.slice(0, -1);
  show.value = false;
  rotate.value = 0;
}

function edit() {
  appUtils.push('/packageTools/tools/Turntable/EditTurntable', { activeIndex: activeIndex.value });
}

function addNew() {
  appUtils.push('/packageTools/tools/Turntable/EditTurntable', { opt: 'add' });
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50rpx 0 200rpx 0;
  &_text {
    margin-right: 10rpx;
  }
}
.whole {
  position: relative;
  width: 500rpx;
  height: 500rpx;
  margin: 0 auto;
}

.text {
  color: #fff;
  position: absolute;
  z-index: 99;
  left: 50%;
  top: 0;
  transform-origin: 0% 250rpx;
  padding-top: 30rpx;
  //max-widtg:2r*sin(每份中心角/2)
  //   500*Math.sin(Math.PI/6)
  //   max-width: 250rpx;
  //避免左右超出再减30
  max-width: 220rpx;
  overflow: hidden;
  text-overflow: ellipsis;
}

.turntable {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  // background: conic-gradient(
  //   #ff93d9 0 60deg,
  //   #5f1bff 60deg 120deg,
  //   #85fccb 120deg 180deg,
  //   #ff93d9 180deg 240deg,
  //   #5f1bff 240deg 300deg,
  //   #85fccb 300deg 360deg
  // );
  background: v-bind("'conic-gradient('+styleStr+')'");
  /* @keyframes duration | timing-function | delay |
   iteration-count | direction | fill-mode | play-state | name */
  animation: 3s ease-in-out 0s 1 normal both running slidein;
}
.center {
  position: absolute;
  width: 100rpx;
  height: 100rpx;
  background: #cd536b;
  border: 25rpx solid #fbb07b;
  border-radius: 50%;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &-pointer {
    width: 35rpx;
    height: 150rpx;
    background-color: #cd536b;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    position: absolute;
    left: 50%;
    top: -120%;
    transform: translateX(-50%);
  }
}

@keyframes slidein {
  from {
    transform: rotate(0);
  }

  to {
    transform: v-bind("'rotate('+rotate+'deg)'");
  }
}
.pop-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30rpx;
  &-title {
    font-weight: bold;
  }
}
.pop-list {
  margin: 30rpx;
  &-item {
    text-align: center;
    display: block;
    line-height: 80rpx;
  }
}

.popover-content {
  width: max-content;
  > text {
    display: block;
    line-height: 80rpx;
    font-size: 30rpx;
  }
}
</style>
