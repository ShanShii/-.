<!-- 购物车 -->
<template>
	<div id="cart">
		<el-table :data="cartProducts" style="width: 100%" ref="multipleTable">
			<el-table-column width="40">
				<template v-slot="scope">						
					<input type="checkbox" v-model="scope.row.checked" @click="handleSelect(scope.row)">
				</template>
			</el-table-column>
			<el-table-column
				prop="id"
				label="商品ID"
			></el-table-column>
			<el-table-column label="pic">
				<template v-slot="scope">
					<img :src="scope.row.image" alt="商品图片">
				</template>
			</el-table-column>
			<el-table-column prop="name" label="商品名称"></el-table-column>
			
			<el-table-column label="数量">
				<template slot-scope="scope">
					<el-input-number size="mini" :min="1" :value="scope.row.num"
                        @input="saveValue" @change="handleChange( scope.row )"></el-input-number>
				</template>
			</el-table-column>

			<el-table-column prop="cost" label="单价"></el-table-column>
			<el-table-column prop="totalPrice" label="合计"></el-table-column>
            
			<el-table-column label="操作" width="100">
				<template v-slot="scope">
					<el-button
						type="danger"
						plain
						icon="el-icon-delete"
						size="mini"
						@click="delProduct(scope.row)"
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="caption">
			<div class="select">
				<el-button icon="el-icon-check" size="mini" circle
					@click="selectAll">全选</el-button>{{selectedPrice}}
			</div>
			<p>总数：{{productsNum}}</p>
			<p>总价：{{totalPrice}}</p>
			<el-button type="danger" icon="el-icon-delete" size="mini"
				@click="deleteAll">清空购物车</el-button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";
export default {
    name: "Cart",
    data() {
        return {
			currentValue: 1,
			all: false,
		};
    },
    methods: {
        ...mapActions(["delProduct"]),
        saveValue(value) {
            this.currentValue = value
        },
        handleChange(data) {
            data.num = this.currentValue
			this.$store.commit('updateCartNum', data)
		},
		handleSelect(data) {
			this.$store.commit('updateChecked', data)
		},
		deleteAll() {
			this.$store.commit('deleteAll')
		},
		selectAll() {
			this.all = this.all == true ? false : true
			this.$store.commit('selectAll', this.all)
		}
    },
    computed: {
        ...mapGetters(['cartProducts', 'productsNum']),
        selectedPrice() {
			let total = 0;
			this.cartProducts.forEach((item) => {
				if(item.checked) total += parseFloat(item.totalPrice);
			})
			return total.toFixed(2);
		},
        totalPrice() {
            let total = 0;
            this.cartProducts.forEach(item => {
                total += parseFloat(item.totalPrice)
            });
            return total.toFixed(2);
		}
	},
	mounted() {
		// console.log(this.cartProducts)
		// this.cartProducts.forEach(item => item.checked = false);
	},
};
</script>
<style lang='scss' scoped>
#cart {
	* {
		margin: 0;
	}
	img {
		width: 60px;
	}
	.caption {
		display: flex;
		margin-top: 30px;
		align-items: center;
		justify-content: space-between;
		.select {
			line-height: 28px;
		}
	}
}
</style>