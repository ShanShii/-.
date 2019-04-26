<!-- 商品简介（卡片） -->
<template>
  <el-col :span="6">
    <router-link :to="'/product/'+data.id">
      <div class="product">
        <div class="image">
          <img :src="data.image" alt="商品">
        </div>
        <div class="caption">
          <div class="name">{{data.name}}</div>
          <div class="product-color" :style="{background: colors[data.color]}"></div>
          <div class="cost">￥ {{data.cost}}</div>
        </div>
        <el-button class="add-cart"
          @click.prevent="handleCart">加入购物车</el-button>
      </div>
    </router-link>
  </el-col>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      colors: {
        白色: "#ffffff",
        金色: "#dac272",
        蓝色: "#233472",
        红色: "#f2352e"
      }
    }
  },
  methods: {
    handleCart() {
      this.$store.commit('addCart', this.data)
    }
  },
}
</script>
<style lang='scss' scoped>
.el-col {
  border-radius: 4px;
  margin-bottom: 40px;
}
.product {
  position: relative;
  min-width: 260px;
  border: 2px solid #eee;
  border-radius: 5px;
  background-color: aqua;
  text-align: center;
  font-size: 14px;
  .image {
    width: 100%;
    height: 260px;
    margin: 0 auto;
    img {
      background-color: white;
      width: 100%;
      height: 100%;
    }
  }
  .product-color {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 auto;
  }
  .add-cart {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: red;
    padding: 5px 5px;
    border-radius: 5px;
    font-size: 12px;
    color: #fff;
    display: none;
  }
  &:hover .add-cart {
    display: block;
  }
}
</style>
