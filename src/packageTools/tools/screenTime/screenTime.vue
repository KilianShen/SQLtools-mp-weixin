<template>
  <view class="page">
    <text class="page_hms">{{ state.dateStrHms }}</text>
    <text class="page_ymd">{{ state.dateStrYMD }}</text>
  </view>
</template>
    
<script lang='ts' setup>
import { onMounted, onUnmounted, reactive, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";
// ===================== 私有属性 =====================
const state = reactive({
  dateStrYMD: "",
  dateStrHms: "",
  timer: 0,
});

// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => {
  state.dateStrYMD = dayjs(new Date()).format("YYYY-MM-DD");
  state.dateStrHms = dayjs(new Date()).format("HH:mm:ss");
  state.timer = setInterval(() => {
    state.dateStrHms = dayjs(new Date()).format("HH:mm:ss");
  }, 1000);
});

onUnmounted(() => {
  clearInterval(state.timer);
});
// ===================== 私有方法 =====================
</script>
    
<style lang="scss" scoped>
.page {
  background: #000;
  width: 100vw;
  height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &_hms {
    font-size: 150rpx;
  }
  &_ymd {
    font-size: 30rpx;
  }
}
</style>