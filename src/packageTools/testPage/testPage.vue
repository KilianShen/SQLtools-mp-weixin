<template>
  <view class="map_container">
    <map
      class="map"
      id="map"
      :longitude="state.longitude"
      :latitude="state.latitude"
      :scale="16"
      :show-location="true"
      :markers="state.markers"
      @markertap="makertap"
    ></map>
  </view>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, toRefs } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import BMapWX from "@/libs/bmap-wx.min.js";
// ===================== 私有属性 =====================
const state: IObject = reactive({
  wxMarkerData: [],
  markers: [],
  /**中心经度 */
  longitude: null,
  /**中心纬度 */
  latitude: null,
  rgcData: {},
});

const BMap: IObject = new BMapWX({
  ak: "Ui916NbXZCXlGWU4i33SZArqhWWReAWK",
});
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => {
  // wx.getLocation({
  //   type: "wgs84",
  //   isHighAccuracy: true,
  //   success(res: IObject) {
  //     console.log("res", res);
  //     const { longitude, latitude } = res;
  //     state.longitude = longitude;
  //     state.latitude = latitude;
  //   },
  // });
  wx.getFuzzyLocation({
    type: "wgs84",
    success: (res: IObject) => {
      console.log("getFuzzyLocation res", res);
    },
    fail: (e: IObject) => {
      console.error("getFuzzyLocation:error", e);
    },
  });

  BMap.regeocoding({
    success: (res: IObject) => {
      console.log("res", res);
      const { wxMarkerData } = res;
      const { originalData } = res;
      console.log("wxMarkerData", wxMarkerData[0].address);
      console.log(originalData.result.addressComponent);
      weekWeather(originalData.result.addressComponent.city);
    },
    fail: (e: IObject) => {
      console.error(e);
    },
  });
});
// ===================== 私有方法 =====================

function makertap(e: IObject) {
  var id = e.markerId;
}

function weekWeather(city: string) {
  uni.request({
    url: "https://v0.yiketianqi.com/free/week", //仅为示例，并非真实接口地址。
    method: "GET",
    data: {
      appid: "51253198",
      appsecret: "yjm3FqHb",
      city: city.slice(0, -1),
    },
    header: {
      "custom-header": "hello",
    },
    success: (res) => {
      console.log(res.data);
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