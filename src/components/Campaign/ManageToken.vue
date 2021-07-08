<template>
  <div class="main-container">
    <div class="form-group">
      <h4>Generate token to access your campaigns</h4>
      <textarea v-model="text" @click="onSelect" class="form-control" id="exampleFormControlTextarea1"
                rows="3"></textarea>
    </div>
    <button class="btn btn-info btn-block" v-on:click="onGenerateToken">Generate token</button>
  </div>
</template>

<script>
export default {
  name: "ManageToken",
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onGenerateToken() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'token/')
          .then(response => this.text = response.data)
          .catch(err => alert(err.response.data));
    },
    onSelect(event) {
      event.target.setSelectionRange(0, this.text.length);
    }
  }
}
</script>

<style scoped>
.main-container {
  width: 60%;
  margin-left: 10%;
  margin-right: 30%;
}

.form-group {
  margin-top: 10%;
}
</style>