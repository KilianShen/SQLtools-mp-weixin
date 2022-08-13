<template>

</template>
    
<script lang='ts' setup>
import { onMounted, reactive, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
// ===================== 私有属性 =====================

// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => { });
// ===================== 私有方法 =====================
</script>
    
<style lang="scss" scoped>
</style>