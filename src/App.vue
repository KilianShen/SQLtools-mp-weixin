<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
const store = useStore();

onLaunch(() => {
  console.log('App Launch');
  // 存储SystemInfo
  wx.getSystemInfoAsync({
    success: (res: IObject) => {
      console.log('getSystemInfoAsync', res);
      store.commit('systemInfo/SET_VALUE', res);
    },
  });

  const updateManager = wx.getUpdateManager();
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: (res: IObject) => {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  // 微信原生监听系统主题状态变化
  const listtener = (res: any) => {
    console.log('wx-themeDdark', res);
  };
  wx.onThemeChange(listtener);

  // uni监听系统主题状态变化
  uni.onThemeChange((res) => {
    console.log('uni-themeDdark', res);
  });
});
onShow((params: any) => {
  console.log('App Show', params);
});
onHide(() => {
  console.log('App Hide');
});
// uni暂不支持App.onThemeChange
// onThemeChange(() => {})
</script>
<style lang="scss">
// iconfont
@import '@/static/iconfont/iconfont.css';
</style>
