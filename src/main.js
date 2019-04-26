import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
})
router.afterEach(() => {
  window.scrollTo(0, 0);
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
