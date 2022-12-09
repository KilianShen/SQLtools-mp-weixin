<template>
  <view class="top">
    <text @click="select('from')">{{ fromName || '--' }}</text>
    <text @click="exchange()" class="iconfont icon-exchange"></text>
    <text @click="select('to')">{{ toName || '--' }}</text>
  </view>
  <textarea class="input" type="text" @input="onKeyInput" placeholder="请输入文字" maxlength="1500" />
  <view class="output">
    <text class="iconfont icon-fanyi output_btn" @click="translate"></text>
    <text>{{ outputValue }}</text>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref, reactive, getCurrentInstance, ComponentInternalInstance, onBeforeMount } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { MD5 } from 'crypto-js';
import appUtils from '@/utils/appUtils';
import emitter from '@/utils/emitter';
// ===================== 私有属性 =====================
const appid = '20220813001304956';
const key = 'gvy53DUYiqwEXdhLr845';

let fromName = ref('');
let fromCode = ref('');
let toName = ref('');
let toCode = ref('');

let inputValue = ref('');
let outputValue: Ref<String> = ref('');

const { appContext } = getCurrentInstance() as ComponentInternalInstance;
// ===================== 生命周期 =====================
onLoad((pageParams: any) => {
  console.info('页面参数:', JSON.stringify(pageParams, null, 2));
});

onMounted(() => {
  emitter.on('langSelt', (data: any) => {
    if (data.type === 'from') {
      fromName.value = data.name;
      fromCode.value = data.code;
    } else if (data.type === 'to') {
      toName.value = data.name;
      toCode.value = data.code;
    }
  });
  /**给默认值 */
  emitter.emit('langSelt', { name: '中文', code: 'zh', type: 'from' });
  emitter.emit('langSelt', { name: '英语', code: 'en', type: 'to' });
});

onBeforeMount(() => {
  emitter.off('langSelt');
});

// ===================== 私有方法 =====================
function translate() {
  if (!inputValue.value) {
    return;
  }
  let salt = new Date().getTime();
  let sign = MD5(appid + inputValue.value + salt + key);
  uni.request({
    url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
    data: {
      q: inputValue.value,
      from: fromCode.value,
      to: toCode.value,
      appid,
      salt,
      sign: encodeURIComponent(sign),
    },
    success: (res: IObject) => {
      outputValue.value = res.data.trans_result[0].dst;
    },
    fail: (err: any) => {
      console.error('err:', err);
    },
  });
}

function select(type: string) {
  appUtils.push('/packageTools/tools/translate/langSelt', { type });
}

function exchange() {
  [fromCode.value, toCode.value] = [toCode.value, fromCode.value];
  [fromName.value, toName.value] = [toName.value, fromName.value];
}

function onKeyInput(event: IObject) {
  inputValue.value = event.target.value;
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 50rpx;
}

.input {
  width: 100%;
  padding: 30rpx;
  min-height: 300rpx;
}

.output {
  margin: 100rpx 20rpx 0;
  position: relative;
  min-height: 300rpx;
  background: #e8e8e8;
  border-radius: 20rpx;
  padding: 100rpx 20rpx 20rpx;

  &_btn {
    position: absolute;
    border-radius: 50%;
    height: 100rpx;
    width: 100rpx;
    line-height: 100rpx;
    margin-left: -50rpx;
    left: 50%;
    top: -50rpx;
    font-size: 80rpx;
    background-color: #fff;
    color: #5dd88d;
    text-align: center;
  }
}
</style>
