<template>
  <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">{{title}}</label>
    <input
      type="text"
      class="form-control"
      placeholder="name@example.com"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
    props: ['title','value']
};
</script>

<style>
</style>