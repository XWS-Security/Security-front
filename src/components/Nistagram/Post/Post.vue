<template>
  <div class="container" style="border:1px solid #cecece;">
    <div class="row">
      <div class="col" style="background-color: #2e2e2e">
        <slide-show v-bind:postId="id"></slide-show>
      </div>
      <div class="col">
        <div>
          <div><profile-picture v-bind:image-name="profileImage" v-bind:username="username" :stories="false"></profile-picture>
            <a v-bind:href="'nistagramprofile?id=' + username"><h4>{{username}}</h4></a><br/><br/>
        </div>
          <small>
            {{parseDate(post.date)}} <span v-if="post.location.id!==null">at <a href="">{{post.location.name}}</a></span><br/>
            <a v-for="t in post.tags" v-bind:key="t" href="/">{{ t }} </a>
          </small>
          {{post.about}}<br/>
          <a><b>{{post.likes}}</b> likes</a>  <a><b>{{post.dislikes}}</b> dislikes</a>
        </div>
        <hr>
        <div v-for="c in post.commentIds" v-bind:key="c" >
          <br>
          <comment v-bind:id="c">
          </comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SlideShow from "@/components/Nistagram/Post/SlideShow";
import ProfilePicture from "@/components/Nistagram/Profile/ProfilePicture";
import {formatDate} from "@/assets/js/HellperFunctions";
import Comment from "@/components/Nistagram/Post/Comment";

export default {
  name: "Post",
  components: {Comment, ProfilePicture, SlideShow},
  data(){
    return {
      id:'',
      profileImage:'',
      username:'',
      post:{likes:0, dislikes:0, date:null, location:{name:null, id:null}, tags:[], commentIds:[], about:""},
    }
  },
  mounted() {
    this.getQueryParams();
    this.getPostInfo();
  },
  methods:{
    getQueryParams() {
      const urlParams = new URLSearchParams(window.location.search);
      this.id = urlParams.get('id');
      this.profileImage=urlParams.get('profileImg');
      this.username=urlParams.get('username');
    },
    getPostInfo(){
      this.$http
          .get(process.env.VUE_APP_CONTENT_URL + 'post/' + this.id)
          .then(response => {
            this.post = response.data
          })
    },
    parseDate(date){
      return formatDate(date);
    }
  }
}
</script>

<style scoped>

</style>
