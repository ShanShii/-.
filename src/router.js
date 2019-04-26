import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list',
      meta: {
        title: '首页'
      },
      component: () => import('./views/list.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        title: '购物车'
      },
      component: () => import('./views/cart.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('./components/pruduct.vue')
    },
    {
      path: '/product/:id',
      meta: {
        title: '商品详情'
      },
      component: () => import('./views/product.vue')
    },
    {
      path: '*',
      redirect: '/list'
    }
  ]
})
