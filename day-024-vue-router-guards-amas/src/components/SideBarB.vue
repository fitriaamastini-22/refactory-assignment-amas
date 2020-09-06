<template>
	<div class="row">
		<div class="col">
			<!-- Side Bar B -->
			<div v-show="can_checkout">
				<router-link :to="{name: 'Checkout'}" class= "btn btn-danger">Checkout</router-link>
				<div class="text-white" v-for="cart in carts" ::key="cart.id">
					<div class="bg-primary h5 p-2 my-0">{{ cart.title }}</div>
					<div class="bg-secondary h5 my-0 d-flex p-2 justify-content-between">
						<div>{{ cart.price }} x {{ cart.counter }}</div>
						<div>{{ cart.price * cart.counter }}</div>
					</div>
					<div class="d-flex bg-dark justify-content-between p-2 mb-2">
						<div>Remove</div>
						<div>
							<button class="btn btn-outline-primary mr-2" @click="addItem(cart.id)">+</button>
							<button class="btn btn-outline-primary mr-2" @click="removeItem(cart.id)">-</button>
						</div>
					</div>
				</div>

				<div class="text-black h2">${{total}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import EventBus from './../event-bus';
export default{	
	data(){
		return {
			carts: [],
			can_checkout: false,
			total : 0,
		};
	},

	mounted() {
	  EventBus.$on('showToCart', (selectedProduct) => {
	    // console.log('enabled: force rerender logout');
	    // this.$forceUpdate();
	    let cartIndex = this.carts.findIndex(cart => cart.id == selectedProduct[0].id );
	    if(cartIndex < 0){
	    	selectedProduct[0].counter = 1;
	    	this.carts.push(selectedProduct[0]);
	    }else{
	    	this.carts[cartIndex].counter += 1;
	    	// console.log(this.carts[cartIndex].counter);
	    }
	    this.can_checkout = true;

	    this.total += selectedProduct[0].price;

	    // console.log(this.total);

	    // console.log(this.carts);
	    this.$forceUpdate();
	  });

	},
	created(){
		// window.addEventListener('beforeunload', this.pageReload());

		if( localStorage.getItem("carts") == undefined ){
			this.carts = [];
		}
		else{
			this.carts = JSON.parse(localStorage.getItem("carts"));
			this.can_checkout = true;
			// console.log(this.carts);
			this.carts.forEach(cart => {
				this.total += (cart.price * cart.counter);
				console.log(this.total);
			});
		}
	},
	beforeDestroy(){
		if( this.carts.length > 0){
			localStorage.removeItem("carts");
			localStorage.setItem("carts", JSON.stringify(this.carts));
			console.log("save to local storage");
		}
		console.log("beforedestroy");
	},
	methods:{
		// pageReload(){
		// 	if( this.carts.length > 0){
		// 		localStorage.removeItem("carts");
		// 		localStorage.setItem("carts", JSON.stringify(this.carts));
		// 		console.log("save to local storage");
		// 	}
		// },
		addItem(idproduct){
			let cartIndex = this.carts.findIndex(cart => cart.id == idproduct);
			this.carts[cartIndex].counter += 1;

			this.total += this.carts[cartIndex].price;

			this.$forceUpdate();
		},
		removeItem(idproduct){
			let cartIndex = this.carts.findIndex(cart => cart.id == idproduct);
			this.total -= this.carts[cartIndex].price;
			if(this.total < 0){
				this.total = 0;
				this.can_checkout = false;
			}

			this.carts[cartIndex].counter -= 1;

			if(this.carts[cartIndex].counter == 0){
				this.carts.splice(cartIndex, 1);
			}

			if(this.carts.length == 0){
				this.total = 0;
				this.can_checkout = false;
			}

			this.$forceUpdate();
		}
	}
}	
</script>

<style scoped>
</style>