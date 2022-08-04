<template>
  <view class="page">
    <van-tabs
      :active="active"
      @change="onChange"
      line-width="3"
      line-height="3.5"
      swipeable
    >
      <template v-slot:nav-left><text>+</text></template>
      <van-tab title="tab 1"><view class="tab">0</view></van-tab>
      <van-tab title="tab 2"><view class="tab">1</view></van-tab>
      <van-tab title="tab 3"><view class="tab">2</view></van-tab>
      <van-tab title="tab 4"><view class="tab">3</view></van-tab>
    </van-tabs>
  </view>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, toRefs, ref, toRaw } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import store from "@/store";
// ===================== 私有属性 =====================
let active = ref(0);
// let safeAreaInsetsTop = toRaw(store.state.systemInfo.systemInfoVal).safeArea
//   .top;

let safeAreaInsetsTop = ref("");
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => {
  safeAreaInsetsTop.value =
    toRaw(store.state.systemInfo.systemInfoVal).safeArea.top + "px";
  console.log("safeAreaInsetsTop.value", safeAreaInsetsTop.value);
  // const query = uni.createSelectorQuery();
  // query
  //   .select(".tab")
  //   .boundingClientRect((res: IObject) => {
  //     console.log("res", res);
  //   })
  //   .exec();
});
// ===================== 私有方法 =====================
function onChange(e: IObject) {
  console.log("e", e.target);
}
</script>
    
<style lang="scss" scoped>
.tab {
  border: 1px solid #f00;
  height: 300rpx;
}
</style>