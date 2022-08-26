<template>
  <view class="page">
    <view class="top">
      <view>{{ address }}</view>
      <view class="tem">
        <view class="tem_num">{{ dayWth.tem }}</view>
        <view class="tem_unit">℃</view>
      </view>
      <view class="top_wea">
        <text>
          {{ dayWth.wea }}
        </text>
        <span :class="`iconfont icon-${dayWth.wea_img}`" style="font-size: 80rpx"></span>
      </view>
    </view>
    <view class="info">
      <view>空气{{ airQuality(Number(dayWth.air)) }}</view>
      <view></view>
      <view>
        {{ dayWth.win }} {{ dayWth.win_speed }} {{ dayWth.win_meter }}
      </view>
    </view>
    <text class="info_tip">更新时间：{{ dayWth.update_time }}</text>

    <view v-for="(item, idx) in weekWth.data" :key="idx" class="item">
      <view class="item_icon">
        <span :class="`iconfont icon-${item.wea_img}`" style="font-size: 60rpx"></span>
        <text>{{ dayjs(item.date).format("MM-DD") }}</text>
      </view>
      <text class="item_wea">{{ item.wea }}</text>
      <text>{{ item.tem_day }}°/{{ item.tem_night }}°</text>
      <!-- <text>{{ item.win }}</text>
      <text>{{ item.win_speed }}</text> -->
    </view>
    <text class="info_tip">更新时间：{{ weekWth.update_time }}</text>
  </view>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, ref, toRaw, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import BMapWX from "@/libs/bmap-wx.min.js";
import dayjs from "dayjs";
// ===================== 私有属性 =====================
let address: any = ref("");
const state: IObject = reactive({
  dayWth: {},
  weekWth: {},
});
let { weekWth, dayWth } = toRefs(state);

const BMap: IObject = new BMapWX({
  ak: "Ui916NbXZCXlGWU4i33SZArqhWWReAWK",
});
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
  wx.getSetting({
    success: (res: IObject) => {
      console.log("authSetting", res);
      if (!res.authSetting["scope.userLocation"]) {
        console.info("没授权");
        wx.authorize({
          scope: "scope.userLocation",
          success: () => { },
          fail: (err: IObject) => {
            console.error("err:", err);
            wx.showToast({
              title: "请检查位置权限是否开启",
              icon: "none",
              duration: 2000,
            });
          },
        });
      }
    },
  });
});

onMounted(() => {
  BMap.regeocoding({
    success: (res: IObject) => {
      console.log("res", res);
      const { result = {} } = res.originalData;
      address =
        result.addressComponent.district + " " + result.addressComponent.street;
      weekWeather(result.addressComponent.city);
      dayWeather(result.addressComponent.city);
    },
    fail: (e: IObject) => {
      console.error(e);
    },
  });
});
// ===================== 私有方法 =====================

function weekWeather(city: string) {
  uni.request({
    url: "https://v0.yiketianqi.com/free/week",
    method: "GET",
    data: {
      appid: "51253198",
      appsecret: "yjm3FqHb",
      city: city.slice(0, -1),
    },
    success: (res) => {
      const { data } = res;
      state.weekWth = data;
      console.log("weekWth", weekWth);
    },
    fail: (e) => {
      console.log("e", e);
    },
  });
}

function dayWeather(city: string) {
  uni.request({
    url: "https://v0.yiketianqi.com/free/day",
    method: "GET",
    data: {
      appid: "51253198",
      appsecret: "yjm3FqHb",
      city: city.slice(0, -1),
    },
    success: (res) => {
      const { data } = res;
      state.dayWth = data;
      console.log("dayWeather", dayWth);
    },
    fail: (e) => {
      console.log("e", e);
    },
  });
}

function airQuality(air: number) {
  if (air >= 0 && air <= 50) {
    return "优：" + air;
  } else if (air >= 51 && air <= 100) {
    return "良：" + air;
  } else if (air >= 101 && air <= 150) {
    return "轻度污染：" + air;
  } else if (air >= 151 && air <= 200) {
    return "中度污染：" + air;
  } else if (air >= 201 && air <= 300) {
    return "重度污染：" + air;
  } else if (air > 300) {
    return "严重污染：" + air;
  }
}
</script>
    
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: rgb(35, 127, 203);
  color: #fff;
}

.top {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30rpx;

  &_wea {
    display: flex;
    align-items: center;
  }
}

.tem {
  display: flex;

  // align-items: flex-start;
  &_num {
    font-size: 150rpx;
  }

  &_unit {
    padding-top: 25rpx;
  }
}

.info {
  display: flex;
  justify-content: space-between;
  padding: 30rpx 30rpx 0;
}

.info_tip {
  display: block;
  color: #999;
  font-size: 20rpx;
  text-align: end;
  margin-right: 30rpx;
  margin-bottom: 40rpx;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 10rpx 30rpx;
  align-items: center;

  &_icon {
    display: flex;
    align-items: center;
    margin-right: 30rpx;

    span {
      font-size: 80rpx;
    }
  }

  &_wea {
    width: 300rpx;
    text-align: left;
  }
}
</style>