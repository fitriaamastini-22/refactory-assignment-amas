<template>
  <div>
    <ul>
      <li @click="selected='Cat Ipsum'">Cat Ipsum</li>
      <li @click="selected='Hipster'">Hipster</li>
    </ul>

    <div>{{selected}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
    };
  },
};
</script>

<style>
</style>