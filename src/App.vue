<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useStore } from "vuex";
import { toRaw } from "vue";
const store = useStore();

onLaunch(() => {
  console.log("App Launch");
  // 存储SystemInfo
  wx.getSystemInfoAsync({
    success: (res: IObject) => {
      console.log("getSystemInfoAsync", res);
      store.commit("systemInfo/SET_VALUE", res);
    },
  });

  const updateManager = wx.getUpdateManager();
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success: (res: IObject) => {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
// iconfont
@import "@/static/iconfont/iconfont.css";
</style>
