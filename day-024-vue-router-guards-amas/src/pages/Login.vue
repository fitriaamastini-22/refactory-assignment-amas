<template>
	<div>
		<div class="row justify-content-center">
		  <div class="col align-self-start">
		  </div>
		  <div class="col-5 align-self-center">
		  	<div class="mb-3 row">
		  	  <label for="staticEmail" class="col-sm-4 col-form-label">Username</label>
		  	  <div class="col-sm-8">
		  	    <input type="text" v-model="username" class="form-control-plaintext" placeholder="username">
		  	  </div>
		  	</div>
		  	<div class="mb-3 row">
		  	  <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
		  	  <div class="col-sm-8">
		  	    <input type="password" v-model="password" class="form-control-plaintext" placeholder="password">
		  	  </div>
		  	</div>
		  	<div class="mb-3 row">
		  		<button type="submit" class= "btn btn-primary mb-3 btn block" @click="login">Login</button>
		  	</div>
		  </div>
		  <div class="col align-self-end">
		  </div>
		</div>
	</div>
</template>

<script>
import EventBus from './../event-bus';

export default{
	data(){
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		login(){
			const userLoginCondition = this.username == 'root' && this.password == "password";
			if(userLoginCondition){
				localStorage.setItem("login", JSON.stringify(true));
				// this.$bus.$emit('logged', 'User logged')
				console.log('signal: force rerender logout');
				EventBus.$emit('force-rerender-logout');
				return this.$router.push({name: "Dashboard"});
			}

			alert("Username / Password salah");
		}
	}
}	
</script>

<style scoped>
</style>