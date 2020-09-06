<template>
  <div>
    <button @click="currentTabComponent='Post'">Posts</button>
    <button @click="currentTabComponent='Archive'">Archive</button>

    <keep-alive>
      <component :is="currentTabComponent" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTabComponent: "Post",
    };
  },
};
</script>

<style>
</style>