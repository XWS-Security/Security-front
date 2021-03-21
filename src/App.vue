<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <CreateCertificateLink></CreateCertificateLink>
      </NavGroup>
    </NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import CreateCertificateLink from "@/components/NavBar/CreateCertificateLink";
import NavGroup from "@/components/NavBar/NavGroup";

export default {
  name: 'App',
  components: {
    CreateCertificateLink,
    NavBar,
    NavGroup
  },
  mounted() {

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
