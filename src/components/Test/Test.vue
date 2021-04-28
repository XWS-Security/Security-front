<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "Test",

  mounted() {
    this.$http
        .get('http://localhost:8080/test/')
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
