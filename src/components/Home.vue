<template>
  <div class="hello">
    <img alt="Security img." src="../assets/security.png">
    <h2>Ništagram</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  mounted() {
    let router = this.$router;
    if (this.user === 'NistagramUser') {
      router.push('/instagram');
    }
  },
  computed: {
    user() {
      return this.$store.state.userType;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
