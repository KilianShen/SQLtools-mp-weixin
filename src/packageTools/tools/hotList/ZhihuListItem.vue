<template>
  <view class="item">
    <view
      :class="`item_index ${
        item.id.startsWith('0_') ? 'first' : item.id.startsWith('1_') ? 'second' : item.id.startsWith('2_') ? 'third' : ''
      }`"
    >
      <text>{{ Number(item.id.split('_')[0]) + 1 }}</text>
    </view>
    <view class="item_content">
      <view class="item_content_title">
        <text>{{ item.target.title }}</text>
      </view>
      <view class="item_content_hot">
        <text>{{ item.detail_text }}</text>
      </view>
    </view>
    <image class="item_thumbnail" :src="item.children[0].thumbnail"></image>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';
// ===================== 私有属性 =====================
interface Prop {
  item: IObject;
}
const { item } = defineProps<Prop>();
// ===================== 生命周期 =====================
onMounted(() => {
  // console.log('toRaw(item)', toRaw(item));
});
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped>
.item {
  margin: 30rpx 20rpx;
  padding-bottom: 20rpx;
  display: flex;
  flex-direction: row;
  border-bottom: 1rpx solid #f6f6f6;

  &_index {
    width: 30rpx;
    font-weight: bold;
  }

  &_content {
    flex: 1;
    padding: 0 20rpx;

    &_title {
      line-height: 40rpx;
      font-weight: bold;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 3;
    }

    &_hot {
      font-size: 25rpx;
      color: #888;
      margin-top: 10rpx;
    }
  }

  &_thumbnail {
    width: 120rpx;
    height: 120rpx;
    border-radius: 10rpx;
  }
}

.first {
  color: #f00;
}

.second {
  color: #f66a2e;
}

.third {
  color: #d5c728;
}
</style>
