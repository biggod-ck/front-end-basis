import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from 'single-spa-vue';
Vue.config.productionTip = false;
const appOptions = {
  router,
  render: h => h(App),
};

if (!window.__POWERED_BY_QIANKUN__) {
  new Vue(appOptions).$mount('#app');
}

if (window.__POWERED_BY_QIANKUN__) {
  /* eslint-disable */
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  console.log(__webpack_public_path__);
}
const vueLifeCycle = singleSpaVue({
  Vue,
  appOptions,
});

export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;
