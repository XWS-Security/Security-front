<template>
  <div>
    <b-jumbotron>
      <div class="input-group rounded">
        <input type="search" class="form-control rounded" v-model="searchValue"
               aria-describedby="search-addon"/>
        <b-button href="#" variant="primary" @click="search">Search</b-button>
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <hr>
      <div class="d-flex align-content-around flex-wrap">
        <b-card v-for="(user, index) in users" :value="user.username" :key="index"
                :title="user.username"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <b-card-text>
          </b-card-text>
          {{ user.about }}
          <b-button href="#" variant="primary" @click="viewProfile(user.username)">View profile</b-button>
        </b-card>
      </div>
      <hr>
      <div class="d-flex align-content-around  justify-content-center flex-wrap light_blue">
        <post-image v-for="(p,index) in posts" :key="index" v-bind:id="p.postId"
                    v-bind:image-name="p.imageName"></post-image>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import PostImage from "@/components/Nistagram/Profile/PostImage";

export default {
  name: "ProfileSearch",
  components: {PostImage},
  data: function () {
    return {
      posts: null,
      users: [],
//      users: [{about: null, username: null}],
      searchValue: '',
      images: []
    }
  },

  mounted() {
    this.getAllUsers();
  },

  methods: {

    search() {
      this.searchPosts();
      this.searchUser();
    },
    getAllUsers() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'profile/getAllUsers')
          .then(response => {
            this.users = response.data;
          }).catch(err => {
        console.log(err)
      });
    },
    searchPosts() {
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'search/' + this.searchValue)
          .then(response => {
            this.posts = response.data;
          }).catch(err => {
        console.log(err)
      });
    },
    searchUser() {
      if (this.searchValue === '') {
        this.getAllUsers();
        return;
      }

      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'profile/searchUser/' + this.searchValue)
          .then(response => {
            this.users = response.data;
          }).catch(err => {
        console.log(err)
      });

    },
    viewProfile(userId) {
      this.$router.push("/nistagramprofile?id=" + userId)
    }
  }

}
</script>

<style scoped>

</style>
