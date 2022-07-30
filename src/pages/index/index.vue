<template>
  <view class="head">
    <button
      open-type="chooseAvatar"
      @chooseavatar="onChooseAvatar"
      class="head_btn"
    >
      <image class="head_btn_avatar" :src="state.avatar"></image>
    </button>
    <input
      type="nickname"
      :value="state.nickname"
      class="head_input"
      placeholder="请输入昵称"
      @blur="blur"
    />
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
let state: IObject = reactive({
  nickname: "",
  avatar:
    "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
});

// beforeCreate(() => {
try {
  const wx_avatar = uni.getStorageSync("wx_avatar");
  const wx_nickname = uni.getStorageSync("wx_nickname");
  state.avatar = wx_avatar ? wx_avatar : state.avatar;
  state.nickname = wx_nickname ? wx_nickname : state.nickname;
} catch (e) {
  console.error("e", e);
}
// });
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

function blur(e: IObject) {
  console.log("e blur", e);
  const { value = "" } = e.detail;
  console.log("value", value);
  state.nickname = value;
  try {
    uni.setStorageSync("wx_nickname", state.nickname);
  } catch (e) {
    console.error(e);
  }
}
function input(e: IObject) {
  console.log("e input", e);
  const { value = "" } = e.detail;
  console.log("value", value);
  state.nickname = value;
  try {
    uni.setStorageSync("wx_nickname", state.nickname);
  } catch (e) {
    console.error(e);
  }
}
</script>

<style lang='scss'>
.head {
  &_btn {
    height: 100rpx;
    width: 100rpx;
    padding: 0 !important;
    &_avatar {
      width: 100rpx;
      height: 100rpx;
    }
  }
  &_input {
    text-align: center;
  }
}
</style>
