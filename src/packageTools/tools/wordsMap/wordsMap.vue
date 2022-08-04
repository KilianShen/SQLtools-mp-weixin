<template>
  <view class="charts-box">
    <QiunDataCharts
      type="word"
      :opts="opts"
      :chartData="chartData"
      :canvas2d="false"
      v-if="reshow"
      canvasId="nxXPjSnjwsNJmwphLUTxSDOgnmfRVwQq"
      ref="ucharts"
    />
  </view>
  <view class="tagBox">
    <view v-for="(item, idx) in chartData.series" :key="idx" class="tagBox_tag">
      {{ item.name }}
      <uni-icons
        type="clear"
        size="20"
        class="tagBox_close"
        color="#999"
        @click="delTag(idx)"
      ></uni-icons>
    </view>
  </view>
  <view class="inputBox">
    <uni-icons type="trash-filled" @click="delAll" size="25"></uni-icons>
    <input
      maxlength="10"
      type="text"
      confirm-type="done"
      placeholder="最大输入长度为10"
      v-model="inputVal"
      @input="input"
      @confirm="confirm"
      class="input"
    />
  </view>
  <text @click="save" class="btn">保存图片</text>
</template>
    
<script lang='ts' setup>
import { onMounted, reactive, toRefs, ref, watch } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import QiunDataCharts from "@/widgets/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue";
import Mock from "mockjs";
// ===================== 私有属性 =====================
let chartData: IObject = reactive(
  Mock.mock({
    "series|10": [
      {
        name: () => Mock.Random.ctitle(2, 7),
        textSize: () => Mock.Random.integer(10, 30),
      },
    ],
  })
);

const opts = {
  padding: undefined,
  extra: {
    word: {
      type: "normal",
      autoColors: false,
    },
  },
};

let reshow = ref(true);
let inputVal = ref("");
let ucharts: any = ref(null);

watch(
  chartData,
  (newVal) => {
    console.log("newVal", newVal);
  },
  { deep: true }
);
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info("页面参数:", pageParams);
});

onMounted(() => {
  console.log("chartData>>>>", JSON.stringify(chartData));
  console.log("ucharts", ucharts);
});
// ===================== 私有方法 =====================
function delTag(idx: number) {
  console.log("idx", idx);
  delete chartData.series[idx];
  chartData.series.splice(idx, 1);
}

function delAll() {
  wx.showModal({
    title: "提示",
    content: "确认删除所有字条？",
    success: (res: IObject) => {
      if (res.confirm) {
        console.log("用户点击确定");
        reshow.value = false;
        chartData.series = [];
        setTimeout(() => {
          reshow.value = true;
        }, 1000);
      } else if (res.cancel) {
        console.log("用户点击取消");
      }
    },
  });
}

function confirm(e: IObject) {
  console.log("e", e.target.value);
  chartData.series.push({
    name: e.target.value,
    textSize: Mock.Random.integer(10, 30),
  });
  inputVal.value = "";
}

function save() {
  ucharts.value.saveImage();
}
</script>
    
<style lang="scss" scoped>
.charts-box {
  width: 100%;
  height: 200px;
}

.tagBox {
  border-top: 30rpx solid #f9f9f9;
  padding: 20rpx 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  &_tag {
    margin: 10rpx;
    padding: 0rpx 20rpx;
    border: 4rpx solid rgb(135, 198, 135);
    border-radius: 10rpx;
    font-size: 25rpx;
    position: relative;
  }
  &_close {
    position: absolute;
    right: -15rpx;
    top: -15rpx;
  }
}

.inputBox {
  display: flex;
  align-items: center;
}

.input {
  flex: 1;
  border: 4rpx solid rgb(135, 198, 135);
  margin: 0 30rpx;
  padding: 0 30rpx;
  border-radius: 25rpx;
  height: 50rpx;
}

.btn {
  position: fixed;
  bottom: 30rpx;
  display: block;
  width: 90%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background: #7abd9a;
  margin: 0 5%;
  border-radius: 50rpx;
  color: #fff;
}
</style>