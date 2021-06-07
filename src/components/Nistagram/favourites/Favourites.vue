<template>
  <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue" style="margin: 1% 20%">
    <post-image v-for="p in posts" :key="p.postId"
                v-bind:imageName="p.imageName"
                v-bind:id="p.postId"
                v-bind:user="p.userId"
                v-bind:profile-img="p.profilePictureName"></post-image>
  </div>
</template>

<script>
export default {
  name: "Favourites",
  data(){
    return{
      posts:[]
    }
  },
  mounted() {
  },
  methods:{
  },
}
</script>

<style scoped>

</style>
