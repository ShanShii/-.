<!-- 商品详情页 -->
<template>
    <div class="product">
        <!-- {{product}} -->
        <div class="product">
          <div class="image">
              <img :src="product.image" alt="商品pic">
          </div>
          <div class="caption">
            <h2>{{product.name}}</h2>
            <div class="cost">￥ {{product.cost}}</div>
            <div class="add-cart"
                @click.prevent="handleAdd">加入购物车</div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Product",
    data () {
        return {
            // 路径中的id来确定商品，渲染页面
            id: parseInt(this.$route.params.id),
            product: null
        };
    },
    methods: {
        getProduct() {
            this.product = this.productList.find(item => item.id === this.id)
        },
        handleAdd() {
            this.$store.commit('addCart', this.product)
        }
    },
    computed: {
        productList() {
            return this.$store.state.productList
        }
    },
    created: function() {
        // creat时获取商品信息
        this.getProduct();
    }
}

</script>
<style lang='scss' scoped>
    .product {
        display: relative;
        background-color: #fff;
        height: 500px;
        margin: 50px 0;
        line-height: 500px;
        text-align: center;
        .image {
            float: left;
            height: 100%;
            img {
                height: 100%;
            }
        }
        .caption {
            display: inline-block;
            text-align: center;
            * {
                line-height: normal;
            }
            .cost {
                line-height: 2em;
            }
            .add-cart {
                background-color: red;
                color: white;
                border-radius: 5px;
                line-height: 2em;
                cursor: pointer;

            }
        }
    }
</style>
