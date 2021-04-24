<template>
  <img alt="" src="../../assets/instagram.png" style="margin: 1% 10% 10% 10%">
</template>

<script>
export default {
  name: "InstagramUserHome",
  mounted() {
    if (this.$store.state.userType !== 'InstagramUser') {
      this.$router.push("/")
    }
  },
}
</script>

<style scoped>

</style>