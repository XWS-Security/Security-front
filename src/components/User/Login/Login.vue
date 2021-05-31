<template>
  <div>
    <b-jumbotron>
      <div class="form-group">
        <label for="emailInput">Email address</label>
        <input type="email" class="form-control" id="emailInput" placeholder="Enter email" v-model="email">
      </div>
      <div class="form-group">
        <label for="passwordInput">Password</label>
        <input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password">
      </div>
      <div class="form-group">
        <label for="twoFactorAuthSecret">Auth code</label>
        <input type="text" class="form-control" id="twoFactorAuthSecret" placeholder="TwoFactorAuthSecret"
               v-model="secret">
      </div>
      <div class="form-group" v-if="!AreInputsValid || !IsEmailValid">
        <p>{{ errorMessage }}</p>
      </div>
      <div class="form-group">
        <a class="btn-link" v-on:click="onResetPassword()">Forgot password?</a>
      </div>
      <button type="submit" class="btn btn-primary btn-block" id="loginButton" v-on:click="onSubmit()">Login</button>
      <button type="submit" class="btn btn-primary btn-block" v-on:click="getTwoFactorAuthSecret">Get Authentication
        Code
      </button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: null,
      password: null,
      secret: null,
      errorMessage: ''
    }
  },

  mounted() {
    const loginButton = document.getElementById("loginButton");
    const twoFactorAuthSecret = document.getElementById("twoFactorAuthSecret");
    loginButton.style.display = "none";
    twoFactorAuthSecret.style.display = "none";
  },

  methods: {

    getTwoFactorAuthSecret() {
      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled!';
        return;
      }
      this.errorMessage = '';

      let user = {email: this.email, password: this.password}
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'login/twoFactorAuth', user)
          .then(response => {
            response.data
            const loginButton = document.getElementById("loginButton");
            const twoFactorAuthSecret = document.getElementById("twoFactorAuthSecret");
            loginButton.style.display = "block";
            twoFactorAuthSecret.style.display = "block";
            alert("Code was sent to email!")
          }).catch(err => {
        console.log(err)
        alert("Something went wrong!")
      });
    },

    onSubmit() {
      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled!';
        return;
      }
      let store = this.$store;
      this.errorMessage = '';

      let user = {email: this.email, password: this.password, twoFactorAuthenticationSecret: this.secret}
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'login/', user)
          .then(response => {
            store.dispatch('startSession', response.data);
            this.dispatch(response.data.userType);
          }).catch(err => {
        console.log(err)
        alert("Login failed! If you entered secret more than 3 times please generate it again.")
      });
    },

    dispatch(type) {
      let router = this.$router;
      if (type === 'InstagramUser') {
        router.push('/instagram');
        return
      } else {
        router.push('/admin');
        return
      }
    },
    onResetPassword() {
      if (!this.IsEmailValid) {
        this.errorMessage = 'Email must be entered!';
        return;
      }
      this.errorMessage = '';
      this.$router.push('passwordReset/' + this.email)
    }
  },
  computed: {
    AreInputsValid() {
      return this.email !== null && this.password !== null && this.email !== '' && this.password !== '';
    },
    IsEmailValid() {
      return this.email !== null && this.email !== '';
    }
  }
}
</script>

<style scoped>

</style>
