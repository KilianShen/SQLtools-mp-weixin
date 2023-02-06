<template>
  <uni-section type="line" titleFontSize="40rpx" title="基本信息"></uni-section>
  <view class="gd">
    <view class="gd1 gdItem">
      <text>{{ state.systemInfo.brand }}</text>
      <text>{{ state.systemInfo.model }}</text>
      <text>{{ state.systemInfo.system }}</text>
      <text>{{ state.systemInfo.platform }}</text>
    </view>
    <view class="gd2 gdItem">
      <text>WeChatVersion:{{ state.systemInfo.version }}</text>
      <text>SDKVersion:{{ state.systemInfo.SDKVersion }}</text>
    </view>
    <view class="gd3 gdItem">
      <view>
        <text>Debug:</text>
        <switch disabled :checked="state.systemInfo.enableDebug" style="transform: scale(0.7)"></switch>
      </view>
      <text>pixelRatio:{{ state.systemInfo.pixelRatio }}</text>
      <text>networkType:{{ state.networkType }}</text>
      <text v-if="state.systemInfo.platform === 'android'">benchmarkLevel:{{ state.systemInfo.benchmarkLevel }}</text>
    </view>
  </view>

  <uni-section type="line" titleFontSize="40rpx" title="屏幕信息"></uni-section>
  <view class="screen">
    <view class="screen_statusBar">StatusBar:{{ state.systemInfo.statusBarHeight }}</view>
    <view class="screen_safeArea">
      <view class="screen_safeArea_MenuButton">MenuButton:{{ state.MenuButtonInfo.height }}</view>
    </view>
    <view class="screen_safeAreaBottom">
      SafeAreaBottom:{{ state.systemInfo.screenHeight - state.systemInfo.safeArea.bottom }}
    </view>
  </view>
  <text style="text-align: center; display: block"> {{ state.systemInfo.screenWidth }}x{{ state.systemInfo.screenHeight }} </text>

  <uni-section type="line" titleFontSize="40rpx" title="应用权限"></uni-section>
  <view class="authorize">
    <view v-for="(item, index) in state.appAuthorizeSetting" :key="index">
      <text>{{ index }}:</text>
      <text>
        {{
          item === 'authorized'
            ? '已授权'
            : item === 'denied'
            ? '拒绝'
            : item === 'not determined' || item === undefined
            ? '尚未请求授权'
            : ''
        }}
      </text>
    </view>
  </view>

  <uni-section type="line" titleFontSize="40rpx" title="应用信息"></uni-section>
  <view class="appInfo">
    <text>{{ state.appBaseInfo.host.version }}</text>
    <text>({{ state.version }})</text>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// ===================== 私有属性 =====================
const state: IObject = reactive({
  systemInfo: {},
  appBaseInfo: {},
  appAuthorizeSetting: {},
  networkType: '',
  accountInfo: {},
  MenuButtonInfo: {},
  version: '',
});
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);

  uni.getSystemInfo({
    success: (res) => {
      console.log('uni.getSystemInfo', res);
    },
  });
  uni.getSystemInfo({
    success: (res: IObject) => {
      state.systemInfo = res;
      console.log('getSystemInfo\n', JSON.stringify(res, null, 2));
    },
  });
  state.appBaseInfo = uni.getAppBaseInfo();
  console.log('appBaseInfo\n', JSON.stringify(state.appBaseInfo, null, 2));
  state.appAuthorizeSetting = uni.getAppAuthorizeSetting();
  uni.getNetworkType({
    success: (res: IObject) => {
      state.networkType = res.networkType;
    },
  });
  state.MenuButtonInfo = uni.getMenuButtonBoundingClientRect();
  console.log('state.MenuButtonInfo', state.MenuButtonInfo);
  state.version = uni.getAccountInfoSync().miniProgram.version || uni.getAccountInfoSync().miniProgram.envVersion;
});

onMounted(() => {});
// ===================== 私有方法 =====================
</script>

<style lang="scss" scoped>
.gd {
  width: 750rpx;
  height: 400rpx;
  display: grid; // 设置网格布局
  grid-template-areas:
    'gd1 gd2'
    'gd1 gd3';
  grid-template-rows: 40% 60%;
  grid-template-columns: 50% 50%;
}
.gd1 {
  grid-area: gd1; // 网格区域的别名为gd1，此别名在grid属性中用到
  line-height: 80rpx;
  font-weight: bold;
}
.gd2 {
  grid-area: gd2;
}
.gd3 {
  grid-area: gd3;
}
.gdItem {
  border: 1px solid #f7f7f7;
  border-radius: 20rpx;
  margin: 15rpx;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f7f7f7;
}

.screen {
  border: 1px solid #333;
  border-radius: 20px;
  box-sizing: border-box;
  height: v-bind("state.systemInfo.screenHeight+'px'");
  width: v-bind("state.systemInfo.screenWidth+'px'");
  overflow: hidden;
  zoom: 0.5;
  font-size: 24px;
  text-align: center;
  margin: 0 auto;
  &_statusBar {
    background-color: rgba($color: #6e6e6e, $alpha: 0.5);
    border-radius: 20px 20px 0 0;
    height: v-bind("state.systemInfo.statusBarHeight+'px'");
  }
  &_safeArea {
    height: v-bind(
      "state.systemInfo.screenHeight- state.systemInfo.statusBarHeight-(state.systemInfo.screenHeight-state.systemInfo.safeArea.bottom)+'px'"
    );
    background-color: rgba($color: #d7ffd0, $alpha: 0.5);
    &_MenuButton {
      background-color: rgba($color: #c4cfff, $alpha: 0.5);
      height: v-bind("state.MenuButtonInfo.height+'px'");
    }
  }
  &_safeAreaBottom {
    background-color: rgba($color: #6e6e6e, $alpha: 0.5);
    height: v-bind("state.systemInfo.screenHeight-state.systemInfo.safeArea.bottom+'px'");
    border-radius: 0 0 20px 20px;
  }
}

.authorize {
  padding: 0 40rpx 40rpx 40rpx;
  line-height: 50rpx;
}
.appInfo {
  padding: 0 40rpx 40rpx 40rpx;
}
</style>
