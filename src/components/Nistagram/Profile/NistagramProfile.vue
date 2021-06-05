<template>
  <div style="margin: 1% 20%">
    <div class="d-flex align-content-around justify-content-left flex-wrap light_blue">
      <profile-picture v-bind:imageName="user.profilePictureName" v-bind:stories="user.hasStories" v-bind:username="id"></profile-picture>
      <div>
        <br>
        <h4>{{ id }}
          <button class="btn btn-info" v-on:click="onFollow()" v-if="!following">follow</button>
          <button class="btn btn-info" v-on:click="onUnfollow()" v-if="following">unfollow</button>
        </h4>
        {{ user.about }}<br>
        <b>321</b> followers <b>121</b> following <b>{{ numberOfPosts }}</b> posts
      </div>

    </div>
    <hr>
    <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue">
      <post-image v-for="i in user.images" :key="i.imageName"
                  v-bind:imageName="i.imageName"
                  v-bind:id="i.postId"
                  v-bind:user="id"
                  v-bind:profile-img="user.profilePictureName"></post-image>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";
import PostImage from "@/components/Nistagram/Profile/PostImage";

export default {
  name: "NistagramProfile",
  components: {PostImage, ProfilePicture},
  data() {
    return {
      user: {},
      id: "",
      following: false
    }
  },
  mounted() {
    this.getId();
    this.getUserInfo();
    // TODO: get following status
  },
  methods: {
    getId() {
      const urlParams = new URLSearchParams(window.location.search);
      this.id = urlParams.get('id');
    },
    getUserInfo() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.id)
          .then(response => {
            this.user = response.data
          })
    },
    onFollow() {
      // let data = {username: this.user.username}
      let data = {username: 'luka'}
      this.$http
          .post(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          .then(response => {
            response.data;
            this.following = true
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    },
    onUnfollow() {
      // let data = {username: this.user.username}
      let data = {username: 'luka'}
      this.$http
          .put(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          .then(response => {
            response.data;
            this.following = false
          })
          .catch(err => {
            err.response.data
            alert("Something went wrong!")
          })
    }
  },
  computed: {
    numberOfPosts: function () {
      if (this.user.images === undefined) {
        return 0;
      } else {
        return this.user.images.length
      }
    },
  },
}
</script>

<style scoped>
.light_blue {
  background-color: #fdfffb
}
</style>
