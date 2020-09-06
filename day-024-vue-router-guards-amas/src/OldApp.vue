<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div>
      <button @click="componentName='HelloWorld'">Hello</button>
      <button @click="componentName='Lists'">List</button>
      <button @click="componentName='Toggle'">Toggle</button>
    </div>

    <component :is="componentName"> </component>
    <div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" />
    <Lists />
    <Toggle /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      componentName: "HelloWorld",
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
