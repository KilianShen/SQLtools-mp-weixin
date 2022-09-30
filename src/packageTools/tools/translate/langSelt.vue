<template>
  <view class="list">
    <text class="list_item" v-for="(item, idx) in langMap" :key="idx" @click="selectLang(item)">
      {{ item.name }}
    </text>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import appUtils from '@/utils/appUtils';
// ===================== 私有属性 =====================
let pageParams: IObject = {};
const langMap: IObject[] = [
  { name: '自动检测', code: 'auto' },
  { name: '中文', code: 'zh' },
  { name: '英语', code: 'en' },
  { name: '粤语', code: 'yue' },
  { name: '文言文', code: 'wyw' },
  { name: '日语', code: 'jp' },
  { name: '韩语', code: 'kor' },
  { name: '法语', code: 'fra' },
  { name: '西班牙语', code: 'spa' },
  { name: '泰语', code: 'th' },
  { name: '阿拉伯语', code: 'ara' },
  { name: '俄语', code: 'ru' },
  { name: '葡萄牙语', code: 'pt' },
  { name: '德语', code: 'de' },
  { name: '意大利语', code: 'it' },
  { name: '希腊语', code: 'el' },
  { name: '荷兰语', code: 'nl' },
  { name: '波兰语', code: 'pl' },
  { name: '保加利亚语', code: 'bul' },
  { name: '爱沙尼亚语', code: 'est' },
  { name: '丹麦语', code: 'dan' },
  { name: '芬兰语', code: 'fin' },
  { name: '捷克语', code: 'cs' },
  { name: '罗马尼亚语', code: 'rom' },
  { name: '斯洛文尼亚语', code: 'slo' },
  { name: '瑞典语', code: 'swe' },
  { name: '匈牙利语', code: 'hu' },
  { name: '繁体中文', code: 'cht' },
  { name: '越南语', code: 'vie' },
];
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
// ===================== 生命周期 =====================
onLoad((d) => {
  console.info('页面参数:', d);
  pageParams = d;
});

onMounted(() => {});
// ===================== 私有方法 =====================
function selectLang(lang: IObject) {
  appContext.config.globalProperties.$mitt.emit('langSelt', { ...lang, type: pageParams.type });
  appUtils.back();
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0 20rpx;

  &_item:first-child {
    border: none;
  }

  &_item {
    display: block;
    line-height: 100rpx;
    border-top: 2rpx solid #f6f6f6;
  }
}
</style>
