<template>
  <CustomScrollList req-url="https://api.zhihu.com/topstory/hot-list" v-slot="slotParams">
    <hotListItem v-for="item in slotParams.data.data" :key="item.id" :item="item"></hotListItem
  ></CustomScrollList>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from 'vue';
import hotListItem from '@/packageTools/tools/hotList/ZhihuListItem.vue';
import CustomScrollList from '@/components/CustomScrollList/CustomScrollList.vue';
// ===================== 私有属性 =====================
// ===================== 生命周期 =====================
onMounted(() => {});
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped></style>
