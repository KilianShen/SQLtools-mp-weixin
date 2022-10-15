<template>
  <CustomScrollList :reqUrl="reqUrl" v-slot="slotParams" @getResult="getResult">
    <view v-for="(item, index) in slotParams.data.data.cards[0].content" :key="index" class="item">
      <uni-card :cover="item.img">
        <template v-slot:title>
          <view class="item_title">
            <text class="item_hotTagImg" v-if="item.hotTagImg">热</text>
            <text>{{ item.query }}</text>
          </view>
        </template>
        <text class="item_desc">{{ item.desc }}</text>
        <view slot="actions" class="card-actions">
          <view class="card-actions-item">
            <CustomShareButton :shareData="item">
              <uni-icons type="redo" size="20" color="#999"></uni-icons>
              <text class="card-actions-item-text">分享</text>
            </CustomShareButton>
          </view>
          <view class="card-actions-item">
            <uni-icons type="heart" size="20" color="#999"></uni-icons>
            <text class="card-actions-item-text">点赞</text>
          </view>
          <view class="card-actions-item">
            <uni-icons type="chatbubble" size="20" color="#999"></uni-icons>
            <text class="card-actions-item-text">评论</text>
          </view>
        </view>
      </uni-card>
    </view>
  </CustomScrollList>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw } from 'vue';
import CustomScrollList from '@/components/CustomScrollList/CustomScrollList.vue';
import CustomShareButton from '@/components/CustomShareButton/CustomShareButton.vue';
// ===================== 私有属性 =====================
const reqUrl = ref('https://top.baidu.com/api/board?platform=wise&tab=realtime');
// ===================== 生命周期 =====================
onMounted(() => {});

// ===================== 私有方法 =====================
function getResult(res: IObject) {
  console.log('getResult', res);
}
</script>

<style lang="scss" scoped>
.item {
  &_title {
    border-bottom: 3rpx solid #e1e1e1;
    padding: 20rpx 0;
  }

  &_hotTagImg {
    width: 40rpx;
    height: 40rpx;
    display: inline-block;
    text-align: center;
    line-height: 40rpx;
    background: #ff7700;
    color: #fff;
    border-radius: 8rpx;
    font-size: 25rpx;
    margin-right: 20rpx;
  }

  &_desc {
    display: block;
  }
}
.card-actions {
  border-top: 3rpx solid #e1e1e1;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 100rpx;
  &-item {
    font-size: 30rpx;
  }
}
</style>
