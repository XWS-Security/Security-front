<template>
  <div style="margin: 1% 5%">
    <div class="d-flex align-content-around justify-content-left flex-wrap light_blue">
      <profile-picture v-bind:imageName="user.profilePictureName"></profile-picture>
      <div>
        <br>
        <h4>{{ id }}
          <button class="btn btn-info">follow</button>
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
      id: ""
    }
  },
  mounted() {
    this.getId();
    this.getUserInfo();
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
  },
  computed: {
    numberOfPosts: function () {
      if (this.user.images === undefined) {
        return 0;
      } else {
        return this.user.images.length
      }
    }
  }
}
</script>

<style scoped>
.light_blue {
  background-color: #fdfffb
}
</style>
