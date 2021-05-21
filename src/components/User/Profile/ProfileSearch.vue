<template>
  <div>
    <b-jumbotron>
      <div class="input-group rounded">
        <input type="search" class="form-control rounded" v-model="searchValue"
               aria-describedby="search-addon"/>
        <b-button href="#" variant="primary" @click="searchUser">Search</b-button>
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <hr>
      <div class="d-flex align-content-around flex-wrap">
        <b-card v-for="(user, index) in users" :value="user.username" :key="index"
                :title="user.username"
                img-src="https://bootdey.com/img/Content/avatar/avatar6.png"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
          <b-card-text>
          </b-card-text>
          {{ user.about }}
          <b-button href="#" variant="primary">View profile</b-button>
        </b-card>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "ProfileSearch",

  data: function () {
    return {
      image: null,
      users: [{about: null, username: null}],
      searchValue: '',
    }
  },

  mounted() {
    this.getAllUsers();
  },

  methods: {

    searchUser() {

      if (this.searchValue === '') {
        this.getAllUsers();
        return;
      }

      console.log(this.searchValue)

      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'profile/searchUser/' + this.searchValue)
          .then(response => {
            this.users = response.data;
          }).catch(err => {
        alert(err.response.data)
      });
    },

    getAllUsers() {
      this.$http
          .get(process.env.VUE_APP_BACKEND_URL + 'profile/getAllUsers')
          .then(response => {
            this.users = response.data;
          }).catch(err => {
        alert(err.response.data)
      });
    }
  }

}
</script>

<style scoped>

</style>
