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
    <h3>{{ user }}</h3>
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
  created() {
    this.$store.dispatch('startSession', null);
    this.$http.defaults.headers.common['Authorization'] = this.$store.getters.tokenString;
  },
  watch: {
    $route() {
      this.$http.defaults.headers.common['Authorization'] = this.$store.getters.tokenString;
    }
  },
  computed: {
    user() {
      let user = this.$store.state.userType;
      return user;
    },
  }
  ,
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
