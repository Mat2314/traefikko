<template>
  <div>
    <!--  Login form in here  -->
    <div class="form-container">
      <h2 class="text-center">Login here</h2>
      <input
          v-model="loginForm.username"
          type="text"
          placeholder="Login"
          class="form-control"
      >

      <input
          v-model="loginForm.password"
          type="password"
          placeholder="password"
          class="form-control"
      >

      <div class="text-center">
        <button
            @click="login"
            class="btn btn-primary">
          Login
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LoginView",

  data() {
    return {
      loginForm: {
        username: null,
        password: null
      }
    }
  },

  methods: {
    login() {
      console.log("Sending: ", this.loginForm);
      this.axios.post("http://api.traefikko.localhost/api/token/", this.loginForm).then((response) => {
        console.log(response.data)
      });
    }
  }
}
</script>

<style scoped>
.form-container {
  box-shadow: 0 0 10px #ddd;
  border-radius: 5px;
  margin: 10px auto;
  width: 500px;
  padding: 20px;
}

.form-container > * {
  margin: 10px 0;
}

</style>