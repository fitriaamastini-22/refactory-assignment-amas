<template>
	<div class="row">
		<content-placeholders class="card-item" v-if="loading">
			<content-placeholders-img />
			<content-placeholders-header />
		</content-placeholders>
		<div class="card col-10" v-else>
			<img :src="item.image" class="card-img-top" alt=" ... " style="width: 200px" />
			<div class="card-body">
				<p class="card-text">title: {{item.title}}</p>
				<p class="card-text">description: {{item.description}}</p>
				<p class="card-text">category: {{item.category}}</p>
				<p class="card-text">price: {{item.price}}</p>
			</div>
		</div>
<!-- 		{{$route.params.id}}
		Detail Item -->
	</div>
</template>

<script>
export default{
	props: ["id"],
	data(){
		return {
			item: {},
			loading: true,
		};
	},
	created(){
		this.getDetailData();
	},
	methods:{
		async getDetailData(){
			const result = await fetch (`https://fakestoreapi.com/products/${this.id}`);
			const data = await result.json();

			this.item = data;
			this.loading = false;
		},
	}
}	
</script>

<style scoped>
</style>