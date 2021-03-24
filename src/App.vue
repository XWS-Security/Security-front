<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <CreateCertificateLink></CreateCertificateLink>
        <ViewCertificatesLink></ViewCertificatesLink>
      </NavGroup>
    </NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar.vue'
import CreateCertificateLink from "@/components/NavBar/CreateCertificateLink";
import ViewCertificatesLink from "./components/NavBar/ViewCertificatesLink";
import NavGroup from "@/components/NavBar/NavGroup";

export default {
  name: 'App',
  components: {
    CreateCertificateLink,
    ViewCertificatesLink,
    NavBar,
    NavGroup
  },
  mounted() {
    this.$router.push({path: '/home'});
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
