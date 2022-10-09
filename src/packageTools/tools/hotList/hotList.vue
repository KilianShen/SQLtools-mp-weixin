<template>
  <scroll-view
    class="scroll"
    scroll-y
    refresher-enabled
    :scroll-top="scrollTop"
    :scroll-with-animation="true"
    :refresher-triggered="triggered"
    @refresherrefresh="refresh"
    @scroll="scroll"
  >
    <hotListItem v-for="item in data.data" :key="item.id" :item="item"></hotListItem>
    <uni-load-more status="no-more"></uni-load-more>
  </scroll-view>
  <view class="pageScrollTo" @click="pageScrollTo()" v-show="oldScrollTop > windowHeight">
    <uni-icons class="pageScrollTo_icon" type="top" size="30"></uni-icons>
  </view>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, Ref, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import hotListItem from '@/packageTools/tools/hotList/hotListItem.vue';
import appUtils from '@/utils/appUtils';
// ===================== 私有属性 =====================
let data: IObject = reactive({ data: [] });
let triggered: Ref<boolean> = ref(false);
let windowHeight: number = wx.getWindowInfo().windowHeight;
let scrollTop = ref(0);
let oldScrollTop = ref(0);
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
  getHotList();
});

onMounted(() => {});

// ===================== 私有方法 =====================
function getHotList() {
  appUtils
    .POST('https://api.zhihu.com/topstory/hot-list')
    .then((res) => {
      data.data = res.data.data;
    })
    .catch((err) => {
      console.log('err', err);
    });
}

async function refresh() {
  triggered.value = true;
  await getHotList();
  triggered.value = false;
}

function scroll(e: IObject) {
  oldScrollTop.value = e.detail.scrollTop;
}

function pageScrollTo() {
  scrollTop.value = oldScrollTop.value;
  nextTick(() => {
    scrollTop.value = 0;
  });
}
</script>

<style lang="scss" scoped>
.scroll {
  height: v-bind("windowHeight+'px'");
}
.pageScrollTo {
  width: 100rpx;
  height: 100rpx;
  position: fixed;
  bottom: 300rpx;
  right: 60rpx;
  background: #e1e1e1;
  border-radius: 50%;
  &_icon {
    display: block;
    text-align: center;
    margin-top: 15%;
  }
}
</style>
