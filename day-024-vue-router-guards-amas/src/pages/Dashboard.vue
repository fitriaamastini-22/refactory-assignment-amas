<template>
  <div class="row">
    <div v-if="loading" class="row">
      <content-placeholders class="card-item" v-for="n in 9" :key="n">
        <content-placeholders-img />
        <content-placeholders-heading />
      </content-placeholders>
    </div>
    <div
      class="card card-item"
      v-for="product in products"
      :key="product.id"
    >

      <router-link :to="{name: 'DetailItem', params: { id:product.id }}">
        <img :src="product.image" class="card-img-top" :alt="product.title"  />
      </router-link>
      
      <div class="card-body">
        <router-link :to="{name: 'DetailItem', params: { id:product.id }}" class="btn btn-primary btn-block">Detail</router-link>
        <button class="btn btn-success btn-block" @click="addToCart(product.id)">Add to Cart</button>

      </div>
    </div>
  </div>
</template>

<script>
import EventBus from './../event-bus';

export default {
  data() {
    return {
      products: [],
      loading: true,
    };
  },

  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const result = await fetch("https://fakestoreapi.com/products");
      const data = await result.json();

      this.products = data;

      this.loading = false;
    },

    addToCart(idproduct){
      // alert(idproduct);
      let selectedProduct = this.products.filter(product => product.id == idproduct );
      console.log(selectedProduct);
      // selectedProduct[0].counter = 1;
      EventBus.$emit('showToCart', selectedProduct);
    }
  },
};
</script>

<style scoped>
.card-item {
  width: 12rem;
  margin: 10px;
  cursor: pointer;
}
</style>