<template>
  <view class="map_container">
    <view>{{ address }}</view>
    <text>{{ dayWth.tem }}</text>
    <text>℃</text>
    <view>{{ dayWth.wea }}</view>
  </view>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, ref, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import BMapWX from "@/libs/bmap-wx.min.js";
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
      console.log("weekWeather", data);
      state.weekWth = data;
    },
    fail: (e) => {
      console.log("e", e);
    },
  });
}

function dayWeather(city: string) {
  uni.request({
    url: "https://yiketianqi.com/free/day",
    method: "GET",
    data: {
      appid: "51253198",
      appsecret: "yjm3FqHb",
      city: city.slice(0, -1),
    },
    success: (res) => {
      const { data } = res;
      console.log("dayWeather", data);
      state.dayWth = data;
    },
    fail: (e) => {
      console.log("e", e);
    },
  });
}
</script>
    
<style lang="scss" scoped>
.map_container {
  height: 300px;
  width: 100%;
}

.map {
  height: 100%;
  width: 100%;
}
</style>