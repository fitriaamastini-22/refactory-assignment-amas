<template>
  <div class="container">
    <Main>
      <!-- <HomePage /> -->
      <Navbar />
<!--       <div class="row">
        <div class="col">
          <router-link to="/"> Dashboard </router-link>
        </div>
        <div class="col order-1">
          <router-link to="/login"> Login </router-link>
        </div>
      </div> -->
<!--       <template v-slot:footer>Footer</template> -->

      <div class="row">
        <!-- <router-view class="col" name="sidebarA"></router-view> -->
        <!-- <router-view class="col-8 justify-content-center"></router-view> -->
        <!-- <router-view class="col" name="sidebarB"></router-view> -->

        <router-view class="col-8 justify-content-center"></router-view>
        <router-view class="col-4" name="sidebarB"></router-view>
      </div>
    </Main>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: "App",
  // components: {
  //   HomePage: () => import('./pages/HomePage'),
  //   Main: () => import('./layouts/Main'),
  //   Alive: () => import('./pages/Alive')
  // },
};
</script>

<style>
</style>
