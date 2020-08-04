import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {registerMicroApps,start} from 'qiankun';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

registerMicroApps([
  {
    name:'child-vue',
    entry:'//192.168.31.134:10000',
    container:'#childVue',
    activeRule:'/vue',
    props:{
      name:'vue'
    }
  }
]);

start({
  prefetch:false
})
