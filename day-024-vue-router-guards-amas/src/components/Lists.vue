<template>
  <div>
    <div style="display: flex; flex-direction: column; width:200px; margin:auto">
      <input v-model="user" @keypress.enter="addUser" placeholder="Add User" />
      <textarea v-model="address" placeholder="Address"></textarea>

      <input type="checkbox" v-model="checked">

      <select v-model="selectedKota" >
          <option v-for="city in cities" :key="city.id" :value="city.name" >{{city.name}}</option>
      </select>
    </div>

    <input v-model="name" />

    <div v-if="loading">Loading</div>
    <div v-else v-for="user in filterUserByName" :key="user.id">{{user.name}}</div>

    <!-- <div v-for="n in 31" :key="n">{{new Date(new Date().setDate(n))}}</div> -->

    <!-- <Toggle  v-for="n in 31" :key="n"/> -->

    <template v-if="loading">asdfasdf</template>

    <template v-else-if="!loading">loading false</template>
  </div>
</template>

<script>
// import Toggle from './Toggle'

const userDummy = (name) => {
  return {
    id: Date.now(),
    name: name,
  };
};
export default {
  components: {
    // Toggle
  },
  data() {
    return {
      selectedKota: "Medan",
      cities: [
          {id: 1, name: "Jakarta"},
          {id: 2, name: "Bandung"},
          {id: 3, name: "Medan"},
          {id: 4, name: "Jogjga"},
      ],
      name: "",
      user: "",
      users: [],
      loading: true,
      checked: false,
      address: "",
    };
  },
  methods: {
    getUserData() {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((result) => result.json())
        .then((data) => {
          this.users = data;
          this.loading = false;
        });
    },

    addUser() {
      this.users.push(userDummy(this.user));
    },
  },

  computed: {
    filterUserByName() {
      return this.users.filter((user) => {
        return user.name.toLowerCase().indexOf(this.name) !== -1;
      });
    },
  },

  created() {
    this.getUserData();
  },
};
</script>

<style>
</style>