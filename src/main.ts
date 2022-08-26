import { createSSRApp } from "vue";
import App from "./App.vue";
import store from "@/store"
import mitt from 'mitt'
export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$mitt = mitt();
  app.use(store)
  return {
    app,
  };
}
