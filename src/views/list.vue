<!-- 路由组件，过滤/排序信息 -->
<template>
    <div id="list">
        <!-- 品牌/颜色过滤栏 -->
        <div v-show="list.length" class="nav-list">
            <el-tabs class="list-control" v-model="brandActive">
                <el-tab-pane label="品牌：" disabled></el-tab-pane>                
                <el-tab-pane
                    class="control-item"
                    v-for="item in brands"
                    :key="item"
                    :label="item"
                    :name="item"></el-tab-pane>
            </el-tabs>
            <el-tabs class="list-control" v-model="colorActive">
                <el-tab-pane label="颜色：" disabled></el-tab-pane>
                <el-tab-pane
                    class="control-item"
                    v-for="item in colors"
                    :key="item"
                    :label="item"
                    :name="item"></el-tab-pane>
            </el-tabs>
            <span></span>
            <el-tabs class="list-control" v-model="sortActive" @tab-click="handleClick">
                <el-tab-pane label="排序：" disabled></el-tab-pane>
                <el-tab-pane
                    class="control-item"
                    label="默认"
                    name="默认"
                    ></el-tab-pane>
                <el-tab-pane
                    class="control-item"
                    :label="'销量'+salesIcon"
                    name="销量"
                    ></el-tab-pane>
                <el-tab-pane
                    class="control-item"
                    :label="'价格'+priceIcon"
                    name="价格"
                    ></el-tab-pane>
            </el-tabs>
        </div>
        <!-- elment-ui响应式商品卡片列表 -->
        <el-row :gutter="70">
            <!-- {{filterList}} -->
            <Product
                v-for="item in filterList"
                :key="item.id"
                :data="item"></Product>
        </el-row>
    </div>
</template>

<script>
import Product from '../components/pruduct'
export default {
    name: "List",
    components: {
        Product
    },
    data () {
        return {
            brandActive: null,
            colorActive: null,
            sortActive: null,
            salesIcon: '',
            priceIcon: '',
            order: '',
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event, event.target)
            if(this.sortActive === '销量') {
                this.salesIcon = this.salesIcon==='↓'? '↑' : '↓';
            } else if(this.sortActive === '价格') {
                this.priceIcon = this.priceIcon==='↓'? '↑' : '↓';
            }
        },
        handleBrand() {

        },
        handleColor() {

        }
    },
    computed: {
        list() {
            return this.$store.state.productList;
        },
        brands() {
            return this.$store.getters.brands;
        },
        colors() {
            return this.$store.getters.colors;
        },
        filterList() {
            let list = [...this.list]
            ///brandFilter
            if(this.brand) list = list.filter(item => {
                return item.brand===this.brand
            })
            //colorFilter
            if(this.color) list = list.filter(item => {
                return item.color===this.color
            })
            return list;
        }
    },
    mounted: function() {
        this.$store.dispatch('getProductList')
    }
}

</script>
<style lang='scss'>
    .nav-list {

    }
</style>
