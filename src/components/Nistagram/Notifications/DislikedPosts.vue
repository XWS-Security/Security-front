<template>
  <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue">
    <post-image v-for="p in posts" :key="p.id"
                v-bind:imageName="p.imageName"
                v-bind:id="p.id"
                v-bind:user="p.userId"
                v-bind:profile-img="p.userProfileImageName"></post-image>
  </div>
</template>

<script>
import PostImage from "@/components/Nistagram/Profile/PostImage";

export default {
  components: {PostImage},
  name: "DislikedPosts",
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_CONTENT_URL + 'post/dislikedPosts')
        .then(response => {
          this.posts = response.data;
        })
  },
  methods: {},
}
</script>

<style scoped>

</style>
