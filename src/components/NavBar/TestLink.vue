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
          .get('http://localhost:8080/test/')
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
