<template>
	<div class="row">
		<div class="spinner-border" role="status" v-if="loading">
			<span class="sr-only">Loading....</span>
		</div>

		<router-link
			class="card card-item"
			v-for="product in products"
			:key="product.id"
			:to="{name: 'DetailItem', params: {id:product.id}}">
				<img :src="product.image" class="card-img-top" :alt="product.title" />
				 <div class="card-body">
				   <button class="btn btn-primary btn-block">Add to Cart</button>
				 </div>
			</router-link>

			
<!-- 		<div class="card card-item" v-for="n in 9" :key="n">
			<img src="https://static.wikia.nocookie.net/hypnosis-mic/images/6/67/Enterthehypmic_cd%2Bdrama.jpg/revision/latest?cb=20190328135844" class="card-img-top" alt="..."> 
		  <div class="card-body">
		    <button class="btn btn-primary btn-block">Add to Cart</button>
		  </div>
		</div> -->
	</div>
</template>

<script>
export default{
	data(){
		return {
			product: [],
			loading: true,
		};
	},

	methods: {
		// pindah(){
		// 	// this.$router.push({name: "Detail Item", params: {id}});
		// },
		async getProducts(){
			const result = await fetch ("https://fakestoreapi.com/products");
			const data = await result.json();

			this.products = data;
			this.loading = false;
		},
	},
}	
</script>

<style scoped>
.card-item{
	width: 18rem;
	margin: 10px;
}
</style>