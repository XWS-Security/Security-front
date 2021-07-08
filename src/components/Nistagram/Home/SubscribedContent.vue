<template>
  <div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-2 align-items-start">
        <profile-picture v-bind:username="username" v-bind:image-name="profile" :stories="false"></profile-picture>
      </div>
      <div class="col-1 m-auto align-items-start">
        <a v-bind:href="'nistagramprofile?id=' + username"><h4>{{ username }}</h4></a>
      </div>
      <div class="col-8"></div>
    </div>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10" v-on:click="onPostClicked()">
        <slide-show v-bind:postId="id"></slide-show>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>

<script>


import SlideShow from "@/components/Nistagram/Post/SlideShow";
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";

export default {
  name: "SubscribedContent",
  components: {ProfilePicture, SlideShow},
  props: ['contentId', 'username', 'profileImage'],
  data() {
    return {
      id: '',
      profile: ''
    }
  },
  mounted() {
    this.id = this.contentId
    this.profile = this.profileImage
  },
  methods: {
    onPostClicked() {
      this.$router.push("/post?id=" + this.contentId + '&username=' + this.username + '&profileImg=' + this.profileImage);
    }
  }
}
</script>

<style scoped>

</style>
