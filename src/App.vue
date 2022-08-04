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
      store.commit("systemInfo/SET_VALUE", res);
    },
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
