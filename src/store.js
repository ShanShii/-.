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
    },
    cartProducts: state => {
      return state.cartList.map(({id, num, checked})=>{
        let product = state.productList.find( item => item.id == id )
          return {
              id : product.id,
              image: product.image,
              name : product.name,
              cost : product.cost.toFixed(2),
              num,
              totalPrice : (product.cost*num).toFixed(2),
              checked
          }
      })
    },
    productsNum: state => {
      return state.cartList.length;
    }
  },
  mutations: {
    setProductList(state, data) {
      state.productList = data;
    },
    updateChecked(state, data) {
      let index = state.cartList.findIndex(item => item.id === data.id);
      state.cartList[index].checked = !state.cartList[index].checked;
    },
    // 加入购物车
    addCart(state, product) {
      let index = state.cartList.findIndex(item => item.id === product.id)
      // console.log(index)
      if(index !== -1) {
        state.cartList[index].num += 1
      } else {
        state.cartList.push({
          id: product.id,
          num: 1,
          ///车内选定状态
          checked: false
        })
      }
      // console.log(state.cartList)
    },
    // 购物车中更新数量
    updateCartNum(state, data) {
      // console.log(data)
      let index = state.cartList.findIndex(item => item.id === data.id);
      state.cartList[index].num = data.num;
    },
    selectAll(state, value) {
      state.cartList.forEach(item => item.checked = value)
    },
    deleteAll(state) {
      state.cartList = []
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
