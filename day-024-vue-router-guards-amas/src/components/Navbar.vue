<template>
  <div>
  	<nav class="navbar navbar-expand-lg navbar-light bg-light">
  	  <div class="container-fluid">
  	    <router-link class="navbar-brand" to="/">Navbar</router-link>
  	    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  	      <span class="navbar-toggler-icon"></span>
  	    </button>
  	    <div class="collapse navbar-collapse" id="navbarSupportedContent">
  	      <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
  	        <li class="nav-item">
  	          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link >
  	        </li>
<!--   	        <li class="nav-item">
  	          <a class="nav-link" href="#">Link</a>
  	        </li> -->
<!--   	        <li class="nav-item dropdown">
  	          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
  	            Dropdown
  	          </a>
  	          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
  	            <li><a class="dropdown-item" href="#">Action</a></li>
  	            <li><a class="dropdown-item" href="#">Another action</a></li>
  	            <li><hr class="dropdown-divider"></li>
  	            <li><a class="dropdown-item" href="#">Something else here</a></li>
  	          </ul>
  	        </li>
  	        <li class="nav-item">
  	          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  	        </li> -->
  	      </ul>

  	      <form class="d-flex">
  	        <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
  	        <button class="btn btn-outline-success" type="submit">Search</button>
  	      </form>

  	      <form class="d-flex">
  	        <button class="btn btn-outline-danger" v-if="isLogged" @click="logout">Logout</button>
  	      </form>
  	    </div>
  	  </div>
  	</nav>
    <slot></slot>
  </div>
</template>

<script>
import EventBus from './../event-bus';

export default {
	data(){
		return {
			// isLogged: this.checkIfIsLogged()
      isLogged: false,
		};
	},
  // props:{
  //     isLogged: {
  //       type: Boolean,
  //       default: false
  //   }
  // },
  mounted() {
    EventBus.$on('force-rerender-logout', () => {
      // console.log('enabled: force rerender logout');
      // this.$forceUpdate();
      this.isLogged = true;
    });

    if ( localStorage.getItem("login") ){
      this.isLogged = true;
    }
  },

  created () {
      // this.$bus.$on('logged', () => {
      //     this.isLogged = this.checkIfIsLogged()
      // })
      // if ( localStorage.getItem("login") ){
      //   this.isLogged = true;
      // }
  },

	methods:{
		logout(){
			localStorage.removeItem("login");
			return this.$router.push("/login");
		},

	},

  // watch:{

  // },
  // computed:{
  //   isLoggedIn: function(){
  //     let login = localStorage.getItem("login");
  //     if(!login){
  //       return true;
  //     }
  //     else{
  //       return false
  //     }
  //   }
  // },
	// completed: {
	// 	login(){
	// 		const login = localStorage.getItem("login");
	// 		if(!login){
	// 			return false;
	// 		}else{
	// 			return true;
	// 		}
	// 	}
	// }
};
</script>

<style>
</style>