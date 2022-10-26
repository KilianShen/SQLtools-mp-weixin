import { createSSRApp } from "vue";
import App from "./App.vue";
import mitt from 'mitt'
import { createPinia } from 'pinia'

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.config.globalProperties.$mitt = mitt();
  app.use(pinia);
  return {
    app,
  };
}
