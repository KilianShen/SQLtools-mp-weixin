<template>
  <CustomScrollList reqUrl="https://world.huanqiu.com/api/list2?node=/e3pmh22ph/e3pmh2398&offset=0&limit=20" v-slot="slotParams">
    <GlobalListItem v-for="(item, index) in slotParams.data.list" :key="index" :data="item" />
  </CustomScrollList>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';
import CustomScrollList from '@/components/CustomScrollList/CustomScrollList.vue';
import GlobalListItem from './GlobalListItem.vue';

// interface Props {
//   item: IObject;
// }
// ===================== 私有属性 =====================
// 对 defineProps() 的响应性解构, 默认值会被编译为等价的运行时选项
// const { item = {} } = defineProps<Props>();

// const a = require('https://weibo.com/ajax/statuses/hot_band');
// ===================== 生命周期 =====================
onMounted(() => {
  //   console.log('item', toRaw(item));
  // console.log('a', a);
});
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped></style>
