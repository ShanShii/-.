import Vue from 'vue'
import Vuex from 'vuex'
import product_data from '../product'
Vue.use(Vuex)

function filterMap(list) {
  let exists = []
  for (let index = 0; index < list.length; index++) {
    const i = list[index];
    if(exists.indexOf(i) == -1) exists.push(i)
  }
  return exists;
}

export default new Vuex.Store({
  state: {
    productList: [],
    cartList: []
  },
  getters: {
    brands: state => {
      return filterMap(state.productList.map(item => item.brand))
    },
    colors: state => {
      return filterMap(state.productList.map(item => item.color))
    }
  },
  mutations: {
    setProductList(state, data) {
      state.productList = data;
    },
    addCart(state, product) {
      let index = state.cartList.indexOf(product)
      if(index !== -1) {
        state.cartList[index].num += 1
      } else {
        product.num = 1
        state.cartList.push(product)
      }
    }
  },
  actions: {
    getProductList(context) {
      setTimeout(() => {
        context.commit('setProductList', product_data);
      }, 1000);
    },
    delProduct(context, product) {
      let index = context.state.cartList.indexOf(product)
      context.state.cartList.splice(index, 1)
    }
  }
})
