<template>
  <scroll-view
    class="scroll"
    scroll-y
    refresher-enabled
    :refresher-triggered="triggered"
    scroll-with-animation
    :scroll-top="scrollTop"
    @refresherrefresh="refresh"
    @scroll="scroll"
  >
    <slot :data="state.data" v-if="!isEmpty(state.data)"></slot>
    <uni-load-more :status="isEmpty(state.data) ? 'loading' : 'no-more'"></uni-load-more>
  </scroll-view>
  <view class="pageScrollTo" @click="pageScrollTo()" v-show="oldScrollTop > 1000">
    <uni-icons class="pageScrollTo_icon" type="top" size="30"></uni-icons>
  </view>
</template>

<script lang="ts" setup>
import appUtils from '@/utils/appUtils';
import { nextTick, onMounted, reactive, ref, toRaw } from 'vue';
import { isEmpty } from 'lodash-es';
import { mainStore } from '@/store';

interface Props {
  reqUrl: string;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  reqUrl: '',
  height: uni.getWindowInfo().windowHeight - 44,
});
const store: IObject = mainStore().systemInfo;
let safeAreaBInsetsBottom = toRaw(store).safeAreaInsets.bottom;

const emit = defineEmits<{ (e: 'getResult', result: any): void }>();
// ===================== 私有属性 =====================
const state: IObject = reactive({
  data: {},
});
let triggered = ref(false);
let scrollTop = ref(0);
let oldScrollTop = ref(0);
// ===================== 生命周期 =====================
onMounted(() => {
  RequestData();
});
// ===================== 私有方法 =====================
function RequestData() {
  appUtils.GET(props.reqUrl).then((res) => {
    state.data = res.data;
    emit('getResult', toRaw(res));
  });
}

async function refresh() {
  triggered.value = true;
  await RequestData();
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
  height: v-bind("props.height-safeAreaBInsetsBottom+'px'");
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
