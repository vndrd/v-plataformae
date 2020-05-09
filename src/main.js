import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)
// Install BootstrapVue
import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)



Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use({
  install() {
    Vue.prototype.destroy = Vue.prototype.$destroy;
  },
});

Vue.config.productionTip = false


var appp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  appp.$store.commit('setLoading', true)

  // Simulate request
  setTimeout(() => {
    next();
  }, 1000)
  
});

router.afterEach(() => {
  appp.$store.commit('setLoading', false)
});
