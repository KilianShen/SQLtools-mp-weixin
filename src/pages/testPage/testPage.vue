<template>
  <i class="iconfont icon-chizi"></i>
  <i class="iconfont icon-bofangqi-danmuzitixiao"></i>
  <i class="iconfont icon-xiugai"></i>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import store from "@/store";
// ===================== 私有属性 =====================

// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => {
  console.log("store.state.a", store.state.a);
});
// ===================== 私有方法 =====================
</script>
    
<style lang="scss" scoped>
</style>