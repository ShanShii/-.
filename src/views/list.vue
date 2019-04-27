<!-- 路由组件，过滤/排序信息 -->
<template>
    <div id="list">
        <!-- 品牌/颜色过滤栏 -->
        <div v-show="list.length" class="nav-list">
            <!-- 品牌过滤栏 -->
            <el-tabs class="list-control" v-model="brandActive">
                <el-tab-pane label="品牌：" disabled></el-tab-pane>                
                <el-tab-pane
                    class="control-item"
                    v-for="item in brands"
                    :key="item"
                    :label="item"
                    :name="item"></el-tab-pane>
            </el-tabs>
            <!-- 颜色过滤栏 -->
            <el-tabs class="list-control" v-model="colorActive">
                <el-tab-pane label="颜色：" disabled></el-tab-pane>
                <el-tab-pane
                    class="control-item"
                    v-for="item in colors"
                    :key="item"
                    :label="item"
                    :name="item"></el-tab-pane>
            </el-tabs>
            <!-- 排序栏 -->
            <el-tabs class="list-control" v-model="sortActive" @tab-click="handleClick(filterList)">
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
import { mapGetters, mapState } from 'vuex';
export default {
    name: "List",
    components: {
        Product
    },
    data () {
        return {
            brandActive: 'null',
            colorActive: 'null',
            sortActive: 'null',
            salesIcon: '',
            priceIcon: '',
        };
    },
    methods: {
        // 排序写的不好，最好还是用一个order来控制吧
        // 这样写不能在选择其他filter的时候排序初始化，先这样吧2019年4月27日
        handleClick(list) {
            // console.log(list);
            if(this.sortActive === '销量') {
                // this.salesIcon = this.salesIcon==='↓'? '↑' : '↓';
                if(this.salesIcon === '↑') {
                    this.salesIcon = '↓'; this.priceIcon = '';
                    list.sort((fir, sec) => fir.sales-sec.sales);
                } else {
                    this.salesIcon = '↑'; this.priceIcon = '';
                    list.sort((fir, sec) => sec.sales-fir.sales);
                }
            } else if(this.sortActive === '价格') {
               if(this.priceIcon === '↑') {
                    this.priceIcon = '↓'; this.salesIcon = '';
                    list.sort((fir, sec) => fir.cost-sec.cost);
                } else {
                    this.priceIcon = '↑'; this.salesIcon = '';
                    list.sort((fir, sec) => sec.cost-fir.cost);
                }
            } else{this.salesIcon = this.priceIcon = ''}
        },
        
    },
    computed: {
        ...mapGetters(['brands', 'colors']),
        ...mapState({
            list: 'productList'
        }),
        filterList() {
            let list = [...this.list]
            ///brandFilter
            if(this.brandActive != 'null') list = list.filter(item => {
                return item.brand===this.brandActive
            })
            //colorFilter
            if(this.colorActive != 'null') list = list.filter(item => {
                return item.color===this.colorActive
            })
            // this.handleClick(list);
            return list;
        }
    },
    mounted: function() {
        this.$store.dispatch('getProductList')
    }
}

</script>
<style lang='scss' scoped>

</style>
