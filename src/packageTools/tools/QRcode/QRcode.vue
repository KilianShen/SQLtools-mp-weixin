<template>
    <UQRCode ref="qrcode" canvasId="qrcode" :value='value' size='200' :options="option" fileType="jpg" :auto="true"
        @complete="complate" @click="click">
    </UQRCode>
    <button @click="save">SAVE</button>
    <image :src="TempFilePath" :show-menu-by-longpress="true" @click="preview" style="width:200px;height:200px"></image>
</template>
    
<script lang="ts" setup>
import { onMounted, reactive, ref, getCurrentInstance, Ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import UQRCode from './Sansnn-uQRCode_3.5.1/components/uqrcode/uqrcode.vue'
//UQRCode: https://github.com/Sansnn/uQRCode
// ===================== 私有属性 =====================
const value: Ref<string> = ref('https://doc.uqrcode.cn/document/uni-app.html')
const option = reactive({
    backgroundColor: '#c4e5e7',
    foregroundColor: '#3174a0',
    backgroundImageWidth: 200,
    foregroundImageBorderRadius: 10,
    foregroundImageSrc: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    foregroundImagePadding: 4,
})

let TempFilePath: Ref<string> = ref('')

const qrcode: IObject = ref({});
// ===================== 生命周期 =====================
onLoad((pageParams) => {
    console.info("页面参数:", pageParams);
});

onMounted(() => { });
// ===================== 私有方法 =====================

function complate() {
    console.log('complate');
}

function click() {
    console.log("qrcode", qrcode);
    qrcode.value.toTempFilePath({
        success: (res: IObject) => {
            console.log('toTempFilePath', res);
            TempFilePath.value = res.tempFilePath;
        }
    });
}

function save() {
    qrcode.value.save({
        success: (res: IObject) => {
            console.log('save', res);
        }
    });
}

function preview() {
    wx.previewImage({
        current: '', // 当前显示图片的 http 链接
        urls: [TempFilePath.value] // 需要预览的图片 http 链接列表
    })
}
</script>
    
<style lang="scss" scoped>

</style>