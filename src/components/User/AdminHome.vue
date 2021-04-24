<template>
  <img src="../../assets/amdins_home.png">
</template>

<script>
export default {
  name: "AdminHome",
  mounted() {
    if (this.$store.state.userType !== 'Administrator') {
      this.$router.push("/")
    }
  },

}
</script>

<style scoped>

</style>