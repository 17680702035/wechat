// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import "@/assets/iconfont/iconfont.css"

import Mint from 'mint-ui';
import { Tabbar, TabItem } from 'mint-ui';

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
// import { Tabbar, TabbarItem } from 'vant';

// Vue.use(Tabbar);
// Vue.use(TabbarItem);
Vue.use(Mint);

// import clickoutsideContext from "mint-ui/src/utils/clickoutside"
// Vue.directive('clickoutside', {
//   bind: clickoutsideContext.bind,
//   unbind: clickoutsideContext.unbind
// });

Vue.config.productionTip = false

Vue.prototype.user = {name: "Zsh", avatar: "https://iconfont.alicdn.com/p/illus/preview_image/itZdkNVyMmbd/1a6e23f0-a55b-4f3e-bc22-d2eb1811c92f.png"}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
