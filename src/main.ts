import { createSSRApp } from "vue";
import App from "./App.vue";
import mitt from 'mitt'
import { createPinia } from 'pinia'

export function createApp() {
  const app = createSSRApp(App);
  app.config.globalProperties.$mitt = mitt();
  app.use(createPinia());
  return { app };
}
