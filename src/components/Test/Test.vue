<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "Test",

  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'test/')
        .then(response => {
          response.data
          alert("Has authority!")
        }).catch(err => {
      alert(err.response.data)
    });
  }
}
</script>

<style scoped>

</style>
