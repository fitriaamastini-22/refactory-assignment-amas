<template>
  <div>
    <!-- {{name}} {{loading}} -->
    <!-- <button @click="hello" :disabled="loading" :id="message">Hello</button> -->

    <!-- <form action @submit.prevent="hitung">
      <input type="number" v-model.number="satu" />
      <input type="number" v-model.number="dua" />
      <button type="submit">hitung</button>
    </form>-->
    <!-- <div class>{{reversedString}}</div> -->
    <!-- {{satu+dua}}
    {{hasil}}-->

    <!-- <input v-model="filter" /> -->

    <HelloWorld />

    <input v-model="message" />

    <div :class="[togleClassBinding]">
        togle class 
    </div>

    <div :class="{hello: toggleOnOff}">
        toggle on off 
    </div>

    <div :style="{color:togleStyleBinding}" >

        toggle style binding

    </div>
    <div :style="[togleStyleArrayBinding]" >

        toggle array style binding

    </div>

    {{togleClassBinding}}

        <pre>
    {{users}}
    </pre>


    <button :disabled="toggleOnOff">Test On Of</button>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      message: "Hello World",
      toggle: true,
      loading: true,
      name: "",
      hasil: 0,
      satu: 0,
      dua: 0,
      users: {},
      filter: "",
    };
  },
  methods: {
    hello() {
      this.toggle = !this.toggle;
      this.message = this.toggle ? "Hello World" : "hello";
    },

    sayHi() {
      alert(this.name);
    },

    hitung() {
      this.hasil = this.satu + this.dua;
    },
    reversedStringMethod() {
      return this.message.split(" ").reverse().join("");
    },

    getUserData() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((result) => result.json())
        .then((data) => {
          const user = data.find((user) => {
            return (
              user.name.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
            );
          });

          fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
            .then((result) => result.json())
            .then((data) => {
              this.users = data;
            });
        });
    },
  },
  computed: {
    reversedString() {
      return this.message.split(" ").reverse().join("");
    },

    toggleOnOff() {
      return this.message.length % 2 === 0 ? true : false;
    },

    togleClassBinding(){
        return this.toggleOnOff && "hello"
    },

    togleStyleBinding(){
        return this.toggleOnOff ? "red" : ""
    },

    togleStyleArrayBinding(){
        return this.toggleOnOff ? {color:"red"} : ""
    }
  },

  watch: {
    message(value) {
      this.toggle = value.length % 2 === 0 ? true : false;
    },
    filter() {
      this.getUserDataDebounce();
    },
  },
  created() {
    setTimeout(() => {
      this.loading = false;
      this.message = "Aku ubah udah 5 detik";
    }, 5000);

    // this.getUserData()

    this.getUserDataDebounce = _.debounce(this.getUserData, 500);
  },
};
</script>

<style scoped>
.hello {
  color: red;
}
</style>