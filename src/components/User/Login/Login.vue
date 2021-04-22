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
      <button type="submit" class="btn btn-primary btn-block" v-on:click="onSubmit()">Submit</button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit() {
      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled!';
        return;
      }

      this.errorMessage = '';

      let user = {email: this.email, password: this.password}
      this.$http
          .post('http://localhost:8080/login/', user)
          .then(response => {
            response.data
            console.log("Login completed")
            // TODO: redirect somewhere
          }).catch(err => {
        alert(err.response.data)
      });
    }
  },
  computed: {
    AreInputsValid() {
      return this.email !== '' && this.password !== '';
    }
  }
}
</script>

<style scoped>

</style>
