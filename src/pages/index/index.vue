<template>
  <view>
    <button
      open-type="chooseAvatar"
      @chooseavatar="onChooseAvatar"
      class="chooseAvatar"
    >
      <image class="avatar" :src="avatar"></image>
    </button>
    <input
      type="nickname"
      class="weui-input"
      placeholder="请输入昵称"
      @confirm="confirm"
    />
    <text>{{ nickname }}</text>
  </view>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    let userInfo: IObject = reactive({
      nickname: "xxx",
      avatar:
        "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
    });
    onBeforeMount(() => {
      try {
        const wx_avatar = uni.getStorageSync("wx_avatar");
        const wx_nickname = uni.getStorageSync("wx_nickname");

        if (wx_avatar) {
          userInfo.avatar = wx_avatar;
        }
        if (wx_nickname) {
          userInfo.nickname = wx_nickname;
        }
      } catch (e) {
        console.error("e", e);
      }
    });

    const onChooseAvatar = (e: IObject) => {
      const { avatarUrl } = e.detail;
      userInfo.avatar = avatarUrl;
      try {
        uni.setStorageSync("wx_avatar", userInfo.avatar);
      } catch (e) {
        console.error(e);
      }
    };

    const confirm = (e: IObject) => {
      const { value = "" } = e.detail;
      console.log("value", value);
      userInfo.nickname = value;
      try {
        uni.setStorageSync("wx_nickname", userInfo.nickname);
      } catch (e) {
        console.error(e);
      }
    };
    return { ...toRefs(userInfo), onChooseAvatar, confirm };
  },
});
</script>

<style>
.chooseAvatar {
  height: 100rpx;
  width: 100rpx;
  padding: 0 !important;
}
.avatar {
  width: 100rpx;
  height: 100rpx;
}
</style>
