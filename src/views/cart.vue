<!-- 购物车 -->
<template>
	<div id="cart">
		<el-table :data="cartList" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection"></el-table-column>
			<el-table-column
				prop="id"
				label="商品ID"
			></el-table-column>
			<el-table-column>
				<template v-slot="scope">
					<img :src="scope.row.image" alt="商品图片">
				</template>
			</el-table-column>
			<el-table-column prop="name" label="商品名称"></el-table-column>
			<el-table-column label="数量">
				<template slot-scope="scope">
					<!-- {{scope.row}} -->
					<!-- {{scope.column}} -->
					<!-- {{scope.$index}} -->
					<!-- {{scope.$store}} -->
					<el-input-number :min="1" size="small" v-model="scope.row.num"></el-input-number>
					<!-- <el-input-number size="mini" :min="1" :value="scope.row.num" v-on:input="handleBlur"
						@change="handleChange( scope.row )"></el-input-number> -->
				</template>
			</el-table-column>
			<el-table-column prop="sales" label="单价"></el-table-column>
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
		<el-input-number size="mini" :min="1" v-model="this_input_value"></el-input-number>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Cart",
    data() {
        return {
			multipleSelection: [],
			this_input_value: 1
        };
    },
    methods: {
        ...mapActions(["delProduct"]),
        handleSelectionChange(val) {
            this.multipleSelection = val;
		},
		// handleChange(product) {
		// 	this.$nextTick(() => {
		// 		console.log(product.row, '&', this.cartList[product.$index])
		// 	})
		// },
		handleClick(event) {
			console.log("*************************")
			event.blur();
		},
		handleBlur(value){
			console.log(value, '*', this.input_number_value)
			this.input_number_value = value
			console.log(value, '*', this.input_number_value)

		},
		handleChange( data ) {
			data.value = this.input_number_value;
		}
    },
    computed: {
        cartList() {
            return this.$store.state.cartList;
        },
        selectedPrice() {
			if(this.multipleSelection.length === 0) return 0;
			return this.multipleSelection.map(item => item.num*item.sales).reduce((prev, cur) => prev+cur)
        }
	},
	mounted() {
		console.log(this.selectedPrice)
	},
};
</script>
<style lang='scss'>
#cart {
  img {
    width: 60px;
  }
}
</style>