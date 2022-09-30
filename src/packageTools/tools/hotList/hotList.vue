<template>
  <scroll-view scroll-y refresher-enabled @refresherrefresh="refresh" :refresher-triggered="triggered">
    <hotListItem v-for="item in data.data" :key="item.id" :item="item"></hotListItem>
  </scroll-view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import hotListItem from './hotListItem.vue';
// ===================== 私有属性 =====================
let data: IObject = reactive({ data: [] });

let triggered: Ref<boolean> = ref(false);

getHotList();
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {});

function getHotList() {
  wx.request({
    url: 'https://api.zhihu.com/topstory/hot-list',
    data: {
      // limit: '10',
      // reverse_order: '0'
    },
    success: (res: IObject) => {
      data.data = res.data.data;
      console.log('data', data);
    },
  });
}

async function refresh() {
  triggered.value = true;
  await getHotList();
  triggered.value = false;
}
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped></style>
