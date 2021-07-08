<template>
  <div class="card" style="width: 18rem;">
    <profile-picture class="mx-auto my-2" v-bind:image-name="info.profilePictureName" v-bind:username="user.username"
                     v-bind:stories="info.hasStories"></profile-picture>
    <div class="card-body">
      <h5 class="card-title">{{ user.username }}</h5>
      <p class="card-text">{{ info.about }}</p>
      <button class="btn btn-info btn-block" v-on:click="onFollow">Follow</button>
    </div>
  </div>
</template>

<script>
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";

export default {
  name: "RecommendedUser",
  components: {ProfilePicture},
  props: ["user"],
  data() {
    return {
      info: {profilePictureName: '', hasStories: false, about: ''}
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_CONTENT_URL + 'profile/' + this.user.username)
        .then(response => this.info = response.data)
        .catch(err => (console.log(err.response.data)));
  },
  methods: {
    onFollow() {
      let data = {username: this.user.username}
      this.$http
          .post(process.env.VUE_APP_FOLLOWER_URL + 'interactions/', data)
          // eslint-disable-next-line no-unused-vars
          .then(response => this.$emit('userFollowed'))
          .catch(err => alert(err.response.data))
    }
  }
}
</script>

<style scoped>

</style>