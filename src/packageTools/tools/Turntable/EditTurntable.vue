<template>
  <form @submit="formSubmit">
    <view class="uni-form-item uni-column">
      <view class="title">
        <text>标题: </text>
      </view>
      <input class="uni-input" name="title" placeholder="请输入转盘标题" :value="state.TemporaryList.title" />
    </view>

    <view class="uni-form-item uni-column" v-for="(item, index) in state.TemporaryList.items" :key="index">
      <view class="option">
        <text>选项{{ index }}</text>
        <uni-icons type="trash-filled" @click="delItem(index)" size="25"></uni-icons>
      </view>
      <input class="uni-input" :name="'option' + index" placeholder="请输入转盘选项" :value="item" />
    </view>
    <text @click="addOptions" class="add">+</text>
    <view class="operation">
      <button class="operation_submit" form-type="submit">提交</button>
      <button class="operation_reset" @click="delTurntable">删除</button>
    </view>
  </form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, toRaw } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { mainStore } from '@/store';
import appUtils from '@/utils/appUtils';

// 页面参数
interface IpageParams {
  activeIndex: string;
}
// ===================== 私有属性 =====================
const state: IObject = reactive({
  pageParams: <IpageParams>{},
  TemporaryList: {},
});

// ===================== 生命周期 =====================
onLoad((query) => {
  console.info('页面参数:', query);
  state.pageParams = query;
  if (state.pageParams.opt === 'add') {
    state.TemporaryList = { title: '', items: [] };
  } else {
    state.TemporaryList = mainStore().turnTableList[parseInt(state.pageParams.activeIndex)];
  }
});

onMounted(() => {});
// ===================== 私有方法 =====================
function formSubmit(e: IObject) {
  let formdata = e.detail.value;
  let _items: IObject[] = [];
  Object.entries(formdata).forEach((element: IObject, index: number) => {
    console.log(index, element[1]);
    if (index !== 0 && element[1]) {
      _items.push(element[1]);
    }
  });
  console.log('_items', _items);
  if (!formdata.title) {
    uni.showToast({
      title: '标题不可为空',
      icon: 'none',
    });
    return;
  }
  if (_items.length < 2) {
    uni.showToast({
      title: '至少输入两个选项',
      icon: 'none',
    });
    return;
  }
  state.TemporaryList.title = formdata.title;
  state.TemporaryList.items = _items;
  if (state.pageParams.opt === 'add') {
    mainStore().turnTableList.push(state.TemporaryList);
  } else {
    mainStore().turnTableList[parseInt(state.pageParams.activeIndex)] = state.TemporaryList;
  }
  uni.setStorageSync('turnTableList', mainStore().turnTableList);
  appUtils.back();
  return;
}

function delTurntable() {
  uni.showModal({
    title: '提示',
    content: '确认删除此转盘？',
    success: (res: IObject) => {
      if (res.confirm) {
        mainStore().turnTableList = mainStore().turnTableList.filter(
          (item: IObject[], index: number) => index !== parseInt(state.pageParams.activeIndex)
        );
        uni.setStorageSync('turnTableList', mainStore().turnTableList);
        appUtils.back();
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    },
  });
}

function addOptions() {
  state.TemporaryList.items.push('');
}

function delItem(idx: number) {
  state.TemporaryList.items.splice(idx, 1);
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 35rpx;
}
.uni-form-item {
  padding: 20rpx;
}
.uni-input {
  border-bottom: 1px solid #000;
}
.option {
  margin: 30rpx 0 15rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > text {
    color: #999;
  }
}

.add {
  display: block;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  border: 1px solid #333;
  border-radius: 15rpx;
  width: 90%;
  margin: 30rpx auto;
  font-size: 80rpx;
  font-weight: bolder;
  color: #999;
}

.operation {
  display: flex;
  flex-direction: row;
  justify-content: center;
  &_submit {
    width: 40%;
    background-color: #04be02;
    color: #fff;
  }
  &_reset {
    width: 40%;
    background-color: #04be02;
    background-color: rgba($color: #333, $alpha: 0.2);
    color: #333;
  }
}
</style>
