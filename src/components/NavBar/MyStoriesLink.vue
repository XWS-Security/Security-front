<template>
  <li class="nav-item active">
    <router-link to="/story?&storiesType=my"><a class="nav-link" href="#">MyStories<span
        class="sr-only">(current)</span></a>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "MyStoriesLink",
  data(){
    return{
      username:'',
      imageName:''
    }
  },
  mounted() {
    this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/user/' + this.id)
          .then(response => {
            let user = response.data.username;
            let profileImg = response.data.profileImg;
            this.$router.push("/post?id=" + this.id + '&username=' + user + '&profileImg=' + profileImg);
          })
    }
  },
  computed: {
    link() {
      if(this.username==='' || this.imageName===''){
        return '';
      }
      return '/story?username='+ this.username + '&profileImage=' + this.imageName;
    }
  }
}
</script>

<style scoped>

</style>
