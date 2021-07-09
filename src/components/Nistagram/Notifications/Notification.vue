<template>
  <div class="d-flex flex-row">
    <profile-picture v-bind:username="notification.nistagramUser" v-bind:stories="false"
                     v-bind:image-name="userProfileImg"></profile-picture>
    <h5 class="my-auto">
      <a v-bind:href="'/nistagramprofile?id=' + notification.nistagramUser">{{ notification.nistagramUser }}</a>
      {{ message }}
      <a v-bind:href="'post?id=' + notification.contentId + '&profileImg=' + profileImage + '&username=' + username">content</a>
    </h5>
  </div>
</template>

<script>
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";

export default {
  name: "Notification",
  components: {ProfilePicture},
  props: ["notification"],
  data() {
    return {
      profileImage: '',
      username: '',
      userProfileImg: ''
    }
  },
  computed: {
    message() {
      console.log(this.notification.notificationType)
      if (this.notification.notificationType === 'COMMENT') return ' has left a comment on your '
      if (this.notification.notificationType === 'REACT') return ' has reacted to your '
      if (this.notification.notificationType === 'CONTENT') return ' has uploaded some new '
      return ''
    }
  },
  mounted() {
    this.getUserInfo()
    this.$http
        .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.notification.nistagramUser)
        .then(response => this.userProfileImg = response.data.profilePictureName)
  },
  methods: {
    getUserInfo() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'profile/getUserInfo')
          .then(response => {
            this.username = response.data.username
            this.getUserInfoContent()
          })
    },
    getUserInfoContent() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.username)
          .then(response => this.profileImage = response.data.profilePictureName)
    },
  }
}
</script>

<style scoped>

</style>