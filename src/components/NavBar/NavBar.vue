<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/home"><a class="navbar-brand">Security App</a></router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <slot></slot>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    msg: String
  }
}
</script>

<style scoped>

</style>
