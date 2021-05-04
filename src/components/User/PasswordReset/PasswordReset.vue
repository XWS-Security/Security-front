<template>
  <div>
    <b-jumbotron>
      <div class="form-group">
        <label for="passwordInput">New password</label>
        <input type="password" class="form-control" id="passwordInput" placeholder="New password" v-model="password">
      </div>
      <div class="form-group">
        <label for="passwordVerificationInput">Confirm new password</label>
        <input type="password" class="form-control" id="passwordVerificationInput" placeholder="Reenter new password"
               v-model="passwordRepeated">
      </div>
      <div class="form-group">
        <label for="passwordResetCode">Please enter the code you received in an email</label>
        <input type="text" class="form-control" id="passwordResetCode" placeholder="Code" v-model="code">
      </div>
      <div class="form-group" v-if="!AreInputsValid || !IsPasswordSafe || !DoPasswordsMatch">
        <p>{{ errorMessage }}</p>
      </div>
      <button type="submit" class="btn btn-primary btn-block" v-on:click="onSubmit()">Submit</button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "PasswordReset",
  data: function () {
    return {
      password: null,
      passwordRepeated: null,
      code: null,
      errorMessage: ''
    }
  },
  mounted() {
    let email = {email: this.$route.params.email}
    this.$http
        .post(process.env.VUE_APP_BACKEND_URL + 'register/password/triggerReset', email)
        .then(response => {
          response.data
          console.log("Password reset request sent!")
        }).catch(err => {
      alert(err.response.data)
    });
  },
  methods: {
    onSubmit() {
      if (!this.AreInputsValid) {
        this.errorMessage = 'All fields must be filled!';
        return;
      }

      if (!this.DoPasswordsMatch) {
        this.errorMessage = 'Passwords must match!';
        return;
      }

      if (!this.IsPasswordSafe) {
        this.errorMessage = 'Password must contain at least 10 characters, a lowercase, an uppercase, a number and one special sign';
        return;
      }

      this.errorMessage = ''

      let router = this.$router;
      let data = {
        email: this.$route.params.email,
        newPassword: this.password,
        newPasswordRepeated: this.passwordRepeated,
        code: this.code
      }
      this.$http
          .post(process.env.VUE_APP_BACKEND_URL + 'register/password/reset', data)
          .then(response => {
            response.data
            alert("Password changed successfully! Proceed to log in!")
            router.push('/login');
            console.log("Password changed!")
          }).catch(err => {
        alert(err.response.data)
      });
    }
  },
  computed: {
    AreInputsValid() {
      return this.email !== null && this.password !== null && this.passwordRepeated !== null && this.code !== null
          && this.password !== '' && this.passwordRepeated !== '' && this.code !== '';
    },
    DoPasswordsMatch() {
      return this.password === this.passwordRepeated;
    },
    IsPasswordSafe() {
      if (this.password === null) return false;
      let hasMinimumLength = (this.password.length > 8);
      let hasNumber = /\d/.test(this.password);
      let hasLowercase = /[a-z]/.test(this.password);
      let hasUppercase = /[A-Z]/.test(this.password);
      let hasSpecial = /[!@#$%^&*)(+=._-]/.test(this.password);
      let hasForbiddenChar = /[<>]/.test(this.password) || /[<>]/.test(this.passwordRepeated) || /[<>]/.test(this.code)
          || /[<>]/.test(this.email);
      return hasMinimumLength && hasNumber && hasLowercase && hasUppercase && hasSpecial && !hasForbiddenChar;
    }
  }
}
</script>

<style scoped>

</style>