<template>
<div class="card my-2">
  <div class="card-body">
    <h5 class="card-title">{{title}}</h5>
    <p class="card-text">{{body}}</p>
    <a href="#" class="btn btn-primary" @click="$emit('selected-post', id)">Detail</a>
  </div>
</div>
</template>

<script>
export default {
  props: {
      title: String,
      body: String,
      id: Number
  },
};
</script>

<style>
</style>