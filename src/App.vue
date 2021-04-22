<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <CreateCertificateLink></CreateCertificateLink>
        <ViewCertificatesLink></ViewCertificatesLink>
        <RegistrationLink></RegistrationLink>
        <LoginLink></LoginLink>
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
import RegistrationLink from "@/components/NavBar/RegistrationLink";
import LoginLink from "@/components/NavBar/LoginLink";

export default {
  name: 'App',
  components: {
    LoginLink,
    RegistrationLink,
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
