<template>
  <view class="empty" @click="choose">
    <image v-if="tempFilePath" :src="tempFilePath" class="photo" mode="aspectFit" show-menu-by-longpress></image>
    <uni-icons v-else type="folder-add" size="200" color="#e1e1e1"></uni-icons>
  </view>
  <slider
    :value="state.editor[activeItem].value"
    :disabled="!tempFilePath"
    @changing="sliderChange"
    activeColor="#ffcf17"
    block-size="20"
    :show-value="false"
  />
  <view class="editor">
    <view
      class="editor_item"
      :style="ItemStyle(index)"
      @click="chooseEditor(item.id)"
      v-for="(item, index) in state.editor"
      :key="index"
    >
      <text>
        {{ item.name }}
      </text>
      <text>{{ state.editor[index].value }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
// ===================== 私有属性 =====================
let tempFilePath = ref('');
let activeItem = ref(0);
const state = reactive({
  editor: [
    {
      name: '褪色',
      id: 0,
      value: 0,
    },
    {
      name: '亮度',
      id: 1,
      value: 100,
    },
  ],
  style: {},
});
// ===================== 生命周期 =====================
onLoad((pageParams) => {
  console.info('页面参数:', pageParams);
});

onMounted(() => {});
// ===================== 私有方法 =====================
/** 选择图片 */
function choose() {
  if (tempFilePath.value) {
    return;
  }
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    camera: 'back',
    success: (res: IObject) => {
      tempFilePath.value = res.tempFiles[0].tempFilePath;
    },
  });
}
/** 选择当前编辑器 */
function chooseEditor(id: number) {
  console.log('id', id);
  activeItem.value = id;
}
/** 改变激活编辑器样式 */
function ItemStyle(index: number) {
  if (index === activeItem.value) {
    return { background: '#ffcf17', color: '#333' };
  }
}

function sliderChange(e: IObject) {
  state.editor[activeItem.value].value = e.detail.value;
}
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.photo {
  height: 80vh;
  filter: v-bind("'grayscale('+state.editor[0].value +'%)'") v-bind("'brightness('+state.editor[1].value+'%)'");
}
.editor::-webkit-scrollbar {
  display: none;
}
.editor {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: scroll;
  &_item {
    color: #fff;
    flex-shrink: 0;
    width: 150rpx;
    height: 150rpx;
    border-radius: 20rpx;
    margin-left: 20rpx;
    background: #262626;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
