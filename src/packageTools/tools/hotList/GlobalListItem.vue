<template>
  <view class="item" v-if="!isEmpty(data)">
    <view>
      <text class="item-title">{{ data.title }}</text>
      <text class="item-sourceNm">{{ data.source.name }}</text>
      <text class="item-time">{{ dayjs().from(dayjs(parseInt(data.ctime))) }}</text>
    </view>
    <image class="item-cover" v-if="data.cover" :src="data.cover"></image>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import zh_cn from 'dayjs/locale/zh-cn';
import { isEmpty } from 'lodash-es';
dayjs.extend(relativeTime);
dayjs.locale(zh_cn);

interface Props {
  data: IObject;
}
// ===================== 私有属性 =====================
// 对 defineProps() 的响应性解构, 默认值会被编译为等价的运行时选项
const { data = {} } = defineProps<Props>();
// ===================== 生命周期 =====================
onMounted(() => {});
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1rpx solid #e1e1e1;
  margin: 0 30rpx;
  padding: 15rpx 0;
  &-title {
    display: block;
    font-weight: bold;
    margin-bottom: 30rpx;
  }
  &-sourceNm {
    font-size: 24rpx;
    color: #999;
    margin-right: 50rpx;
  }
  &-time {
    font-size: 24rpx;
    color: #999;
  }
  &-cover {
    flex-shrink: 0;
    width: 200rpx;
    height: 150rpx;
  }
}
</style>
