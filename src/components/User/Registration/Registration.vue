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
        <label for="passwordVerification">Password</label>
        <input type="password" class="form-control" id="passwordVerification"
               placeholder="Please reenter your password"
               v-model="passwordVerification">
      </div>
      <div class="form-group" v-if="!AreInputsValid || !IsPasswordSafe">
        <p>{{ errorMessage }}</p>
      </div>
      <button type="submit" class="btn btn-primary btn-block" v-on:click="onSubmit()">Submit</button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data: function () {
    return {
      email: null,
      password: null,
      passwordVerification: null,
      errorMessage: ''
    }
  },
  methods: {
    onSubmit() {
      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled!';
        return;
      }

      if (!this.IsPasswordSafe) {
        this.errorMessage = 'Password must contain at least 8 characters, a lowercase, an uppercase, a number and one special sign';
        return;
      }

      this.errorMessage = '';

      let user = {email: this.email, password: this.password, repeatedPassword: this.passwordVerification}
      this.$http
          .post('http://localhost:8080/register/', user)
          .then(response => {
            response.data
            console.log("Registration completed")
            // TODO: redirect somewhere
          }).catch(err => {
        alert(err.response.data)
      });
    }
  },
  computed: {
    AreInputsValid() {
      return this.email !== '' && this.password !== '' && this.passwordVerification !== '' && this.password === this.passwordVerification;
    },
    IsPasswordSafe() {
      if (this.password === null) return false;
      let hasMinimumLength = (this.password.length > 8);
      let hasNumber = /\d/.test(this.password);
      let hasLowercase = /[a-z]/.test(this.password);
      let hasUppercase = /[A-Z]/.test(this.password);
      let hasSpecial = /[!@#$%^&*)(+=._-]/.test(this.password);
      return hasMinimumLength && hasNumber && hasLowercase && hasUppercase && hasSpecial;
    }
  }
}
</script>

<style scoped>

</style>
