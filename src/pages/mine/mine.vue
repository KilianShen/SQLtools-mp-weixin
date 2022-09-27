<template>
  <view class="head">
    <button open-type="chooseAvatar" @chooseavatar="onChooseAvatar" class="head_btn">
      <image class="head_btn_avatar" :src="state.avatar"></image>
    </button>
    <view class="head_inputBox">
      <input type="nickname" :value="state.nickname || state.initialName" class="head_inputBox_input"
        placeholder="请输入昵称" :disabled="state.disabled" :focus="!state.disabled" @input="input" @blur="blur"
        ref="input" />
      <i class="iconfont icon-xiugai head_inputBox_icon" @click="edit"></i>
    </view>
  </view>
  <view class="gap"></view>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Mock from "mockjs";

let state: IObject = reactive({
  nickname: "",
  initialName: "",
  avatar:
    "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
  disabled: true,
});

try {
  const wx_avatar = uni.getStorageSync("wx_avatar");
  const wx_nickname = uni.getStorageSync("wx_nickname");
  const initialName = uni.getStorageSync("initialName");
  state.avatar = wx_avatar ? wx_avatar : state.avatar;
  state.nickname = wx_nickname ? wx_nickname : state.nickname;
  console.log("state.nickname", state.nickname);
  if (!wx_nickname && !initialName) {
    state.initialName = `游客_${Mock.Random.string(8)}`;
    uni.setStorageSync("initialName", state.initialName);
  } else {
    state.nickname = wx_nickname || initialName;
  }
} catch (e) {
  console.error("e", e);
}

onMounted(() => {
  console.log("state", state);
});

function onChooseAvatar(e: IObject) {
  console.log("e", e);
  const { avatarUrl } = e.detail;
  state.avatar = avatarUrl;
  try {
    uni.setStorageSync("wx_avatar", state.avatar);
  } catch (e) {
    console.error(e);
  }
}

function input(e: IObject) {
  const { value = "" } = e.detail;
  state.nickname = value;
  try {
    uni.setStorageSync("wx_nickname", state.nickname);
  } catch (e) {
    console.error(e);
  }
}

function edit() {
  state.disabled = false;
}

function blur() {
  state.disabled = true;
}
</script>

<style lang="scss">
.gap {
  height: 30rpx;
  width: 100%;
  background: #f8f8f8;
}

@media (prefers-color-scheme: dark) {
  .gap {
    height: 30rpx;
    width: 100%;
    background: #424242;
  }
}

.head {
  padding: 30rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &_btn {
    height: 100rpx;
    min-width: 100rpx;
    padding: 0 !important;
    margin: 0;

    &_avatar {
      width: 100rpx;
      height: 100rpx;
    }
  }

  &_inputBox {
    width: 100%;
    margin: 0 30rpx;
    display: flex;
    justify-content: space-between;

    &_icon {
      font-size: 40rpx;
      font-weight: bold;
      color: #999;
    }
  }
}
</style>
