<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <CreateCertificateLink v-if="user === 'Administrator'"></CreateCertificateLink>
        <ViewCertificatesLink v-if="user === 'Administrator'"></ViewCertificatesLink>
        <RegistrationLink v-if="user == null"></RegistrationLink>
        <LoginLink v-if="user == null"></LoginLink>
        <LogOutLink v-if="user !== null"></LogOutLink>
        <ChangePasswordLink v-if="user !== null"></ChangePasswordLink>
        <ProfileLink v-if="user === 'NistagramUser'"></ProfileLink>
        <NotificationsLink v-if="user === 'NistagramUser'"></NotificationsLink>
        <UploadContentLink v-if="user === 'NistagramUser'"></UploadContentLink>
        <SavedContentLink v-if="user === 'NistagramUser'"></SavedContentLink>
        <MyStoriesLink v-if="user === 'NistagramUser'"></MyStoriesLink>
        <ProfileSearchLink></ProfileSearchLink>
        <TestLink></TestLink>
        <ReportedLink v-if="user === 'Administrator'"></ReportedLink>
        <ReportedStoriesLink></ReportedStoriesLink>
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
import LogOutLink from "@/components/NavBar/LogOutLink";
import TestLink from "@/components/NavBar/TestLink";
import ChangePasswordLink from "@/components/NavBar/ChangePasswordLink";
import ProfileLink from "@/components/NavBar/ProfileLink";
import ProfileSearchLink from "@/components/NavBar/ProfileSearchLink";
import NotificationsLink from "@/components/NavBar/NotificationsLink";
import UploadContentLink from "@/components/NavBar/UploadContentLink";
import SavedContentLink from "@/components/NavBar/SavedContentLink";
import MyStoriesLink from "@/components/NavBar/MyStoriesLink";
import ReportedLink from "@/components/NavBar/ReportedLink";
import ReportedStoriesLink from "@/components/NavBar/ReportedStoriesLink";

export default {
  name: 'App',
  components: {
    ReportedStoriesLink,
    ReportedLink,
    MyStoriesLink,
    SavedContentLink,
    NotificationsLink,
    UploadContentLink,
    ProfileSearchLink,
    ProfileLink,
    ChangePasswordLink,
    TestLink,
    LogOutLink,
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
