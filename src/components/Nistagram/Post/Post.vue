<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <slide-show v-bind:postId="id"></slide-show>
      </div>
      <div class="col">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideShow from "@/components/Nistagram/Post/SlideShow";
export default {
  name: "Post",
  components: {SlideShow},
  data(){
    return {
      id:'',
      post:null
    }
  },
  mounted() {
    this.getPostId();
    this.getPostInfo();
  },
  methods:{
    getPostId() {
      const urlParams = new URLSearchParams(window.location.search);
      this.id = urlParams.get('id');
    },
    getPostInfo(){
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/' + this.id)
          .then(response => {
            this.post = response.data
          })
    }
  }
}
</script>

<style scoped>

</style>
