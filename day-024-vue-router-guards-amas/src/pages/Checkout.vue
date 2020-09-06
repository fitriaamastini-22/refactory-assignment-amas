<template>
	<div class="row justify-content-center">
		<div class="container d-flex my-5 py-5 col-8 justify-content-center">
			<div class="bg-secondary p-5 justify-content-center rounded text-white">
				<h4>Payment</h4>
				<div class="py-2" v-for="cart in carts" ::key="cart.id">
					<div class="h5 my-0">{{ cart.title }}</div>
					<div class="h5 my-0 d-flex justify-content-between">
						<div>{{ cart.price }} x {{ cart.counter }}</div>
						<div>${{ cart.price * cart.counter }}</div>
					</div>
				</div>
				<div class="h4">Total : ${{total}}</div>
					<div class="btn btn-success btn-block" @click="proceedToPay()">Pay</div>
					<div class="btn btn-danger btn-block" @click="$router.go(-1)">Cancel</div>
			</div>
		</div><!---->
	</div>	
</template>
<script>
export default{
	// props: ["checkout"],
	data(){
		return {
			carts: [],
			total: 0,
		};
	},
	mounted(){
		this.getCarts()
	},
	methods:{
		getCarts(){
			this.carts = JSON.parse(localStorage.getItem("carts"));
			// let groundTotal = 0;
			this.carts.forEach(cart => {
				this.total += (cart.price * cart.counter);
				console.log(this.total);
			});

			// this.total = groundTotal;
			// console.log(this.carts);
		},
		proceedToPay(){
			localStorage.removeItem("carts");
			return this.$router.push({name: "Dashboard"});
		}
	}
}	
</script>

<style scoped>
</style>
