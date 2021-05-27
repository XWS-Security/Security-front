<template>
  <div>
    <a class="nav-link" v-on:click="test">Test</a>
  </div>
</template>

<script>
export default {
  name: "TestLink",

  methods: {
    test() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'followerMicroservice/hitMicroservice')
          .then(response => {
            response.data
            alert("Has authority!")
          }).catch(err => {
        alert(err.response.data)
      });
    }
  }
}
</script>

<style scoped>

</style>
